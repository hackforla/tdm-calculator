import React, { useEffect, useState, useCallback, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import UserContext from "../../contexts/UserContext";
import TdmCalculationWizard from "./TdmCalculationWizard";
import * as ruleService from "../../services/rule.service";
import * as projectService from "../../services/project.service";
import Engine from "../../services/tdm-engine";
import { useToast } from "../../contexts/Toast";

// These are the calculation results we want to calculate
// and display on the main page.
const resultRuleCodes = [
  "PROJECT_LEVEL",
  "CALC_PARK_RATIO",
  "TARGET_POINTS_PARK",
  "PTS_EARNED"
];

const filters = {
  projectDescriptionRules: rule =>
    rule.category === "input" && rule.calculationPanelId === 31 && rule.display,
  specificationRules: rule =>
    rule.category === "input" && rule.calculationPanelId !== 31 && rule.used,
  targetPointRules: rule =>
    rule.category === "measure" &&
    rule.display &&
    rule.calculationPanelId === 10,
  strategyRules: rule =>
    (rule.category === "measure" && rule.calculationPanelId !== 10) ||
    rule.code === "STRATEGY_PARKING_5"
};

export function TdmCalculationContainer({ contentContainerRef }) {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const userContext = useContext(UserContext);
  const account = userContext ? userContext.account : null;
  const isAdmin = !!account?.isAdmin;
  const [engine, setEngine] = useState(null);
  const [formInputs, setFormInputs] = useState({});
  const [partialAIN, setPartialAIN] = useState("");
  const projectId = params.projectId ? Number(params.projectId) : 0;
  const [strategiesInitialized, setStrategiesInitialized] = useState(false);
  const [formHasSaved, setFormHasSaved] = useState(true);
  const [inapplicableStrategiesModal, setInapplicableStrategiesModal] =
    useState(false);
  const [rules, setRules] = useState([]);

  const [project, setProject] = useState({});
  const [shareView, setShareView] = useState(false);

  const toast = useToast();

  const fetchRules = useCallback(async () => {
    const ruleResponse = await ruleService.getByCalculationId(
      TdmCalculationContainer.calculationId
    );
    // console.log(ruleResponse.data);
    setEngine(new Engine(ruleResponse.data));
  }, []);

  // Get the rules for the calculation once when component is loaded.
  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  // Initialize Engine and (if existing project), perform initial calculation.
  const initializeEngine = useCallback(async () => {
    // Only run if engine has been instantiated
    if (!engine) return;
    try {
      let projectResponse = null;
      let inputs = {};
      if (Number(projectId) > 0 && account?.id) {
        let locationPath = location.pathname.split("/");
        if (locationPath[1] == "projects") {
          try {
            projectResponse = await projectService.getByIdWithEmail(projectId);
          } catch (err) {
            if (err.response.status == 404) {
              navigate(`/login?url=${locationPath[1]}/${locationPath[2]}`);
            } else {
              console.error(JSON.stringify(err, null, 2));
              throw new Error(JSON.stringify(err, null, 2));
            }
          }
        } else {
          projectResponse = await projectService.getById(projectId);
        }
        if (projectResponse) {
          setProject(projectResponse.data);
          setShareView(projectResponse.data.loginId !== account.id && !isAdmin);
          inputs = JSON.parse(projectResponse.data.formInputs);
          setStrategiesInitialized(true);
        }
      } else {
        setShareView(false);
        setStrategiesInitialized(false);
      }
      engine.run(inputs, resultRuleCodes);
      setFormInputs(inputs);
      setRules(engine.showRulesArray());
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      throw new Error(JSON.stringify(err, null, 2));
    }
  }, [engine, projectId, account, setRules, setProject]); // eslint-disable-line react-hooks/exhaustive-deps

  // Initialize the engine with saved project data, as appropriate.
  // Should run only when projectId changes.
  useEffect(() => {
    initializeEngine();
  }, [projectId, initializeEngine]);

  const closeStrategiesModal = () => {
    setInapplicableStrategiesModal(!inapplicableStrategiesModal);
  };

  const recalculate = updatedFormInputs => {
    const strategiesDeselected = engine.run(updatedFormInputs, resultRuleCodes); //TODO cannot read property 'run' on null when switching from calculation to public form to create project
    const rules = engine.showRulesArray();
    //The following several lines can be uncommented for debugging
    // console.log("Updated Rules:");
    // console.log(rules);
    // const showWork = engine.showWork("PARK_REQUIREMENT");
    // console.log("Show Work:");
    // console.log(showWork);
    // update state with modified updatedFormInputs and rules
    setFormInputs(updatedFormInputs);
    // eslint-disable-next-line no-console
    console.log("recalculate rules");
    setRules(rules);
    setFormHasSaved(false);
    if (strategiesDeselected) {
      closeStrategiesModal();
    }
  };

  const initializeStrategies = () => {
    if (rules.length > 0 && !strategiesInitialized) {
      onInputChange({ target: { name: "STRATEGY_BIKE_4", value: true } });
      setStrategiesInitialized(true);
    }
  };

  const applySideEffects = (inputs, rule, value) => {
    if (rule?.sideEffects) {
      const sideEffectsArray = rule.sideEffects
        ? JSON.parse(rule.sideEffects)
        : null;
      const sideEffects =
        sideEffectsArray.find(s => s.value === value) ||
        sideEffectsArray.find(s => s.value === "default") ||
        null;
      if (!sideEffects) return;
      sideEffects.effects.forEach(sideEffect => {
        const type = getRuleByCode(sideEffect.code).dataType;
        // if sideEffect.value is null, do not alter the value.
        if (sideEffect.value !== null) {
          if (type === "boolean" || type === "number") {
            inputs[sideEffect.code] = sideEffect.value;
          } else if (
            type === "choice" &&
            // if target rule is a choice, and sideEffect.value is > "0",
            // we only want to set it, if it is greater than the current value.
            (!inputs[sideEffect.code] || // initial value might be undefined or ""
              sideEffect.value > inputs[sideEffect.code] ||
              sideEffect.value === "0")
          ) {
            inputs[sideEffect.code] = sideEffect.value;
          }
        }
      });
    }
  };

  const onParkingProvidedChange = e => {
    const parkingBaseline = rules.find(
      r => r.code === "PARK_REQUIREMENT"
    ).value;
    const modifiedInputs = {};
    modifiedInputs["PARK_SPACES"] = e.target.value;
    let reducedParkingIndex = 0;
    const newParkingRatio = Number(e.target.value) / parkingBaseline;
    if (e.target.value === "") {
      // Special case where parking provided is not specified
      reducedParkingIndex = 0;
    } else if (newParkingRatio <= 0.1) {
      reducedParkingIndex = 4;
    } else if (newParkingRatio <= 0.5) {
      reducedParkingIndex = 3;
    } else if (newParkingRatio <= 0.75) {
      reducedParkingIndex = 2;
    } else if (newParkingRatio <= 0.9) {
      reducedParkingIndex = 1;
    }
    modifiedInputs["STRATEGY_PARKING_5"] = reducedParkingIndex;

    const newFormInputs = {
      ...formInputs,
      ...modifiedInputs
    };
    recalculate(newFormInputs);
  };

  const projectLevel =
    rules && rules.find(rule => rule.code === "PROJECT_LEVEL")
      ? rules.find(rule => rule.code === "PROJECT_LEVEL").value
      : 0;

  const getRuleByCode = ruleCode => {
    const rule = rules.find(rule => rule.code === ruleCode);
    if (rule === undefined) {
      throw new Error("Rule not found for code " + ruleCode);
    }
    return rule;
  };

  const limitToInt = value => {
    return value.replace(/\D/g, "");
  };

  const onInputChange = e => {
    const ruleCode = (e.target && e.target.name) || e.detail.name;
    let value = e.target
      ? e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value
      : e.detail.value
          .reduce((acc, item) => {
            return [...acc, item.value];
          }, [])
          .join();
    if (!ruleCode) {
      throw new Error("Input is missing name attribute");
    }

    const rule = getRuleByCode(ruleCode);

    // Convert value to appropriate Data type
    if (rule.dataType === "number") {
      value = limitToInt(value);
      // "PARK_SPACES" is the only measure allowed to be zero (vs. "")
      if (rule.code !== "PARK_SPACES") {
        value = value === "0" ? "" : value;
      }
    }
    ``;
    let newFormInputs = {
      ...formInputs,
      [ruleCode]: value
    };
    applySideEffects(newFormInputs, rule, value);

    recalculate(newFormInputs);
  };

  const onPartialAINChange = value => {
    setPartialAIN(value);
  };

  const onCommentChange = e => {
    let ruleCode = e.target.name;
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    const rule = getRuleByCode(ruleCode);

    if (!rule) {
      throw new Error(`Rule ${ruleCode} not found.`);
    }

    // In formInputs, comments are stored with the key <ruleCode>_comment
    const newFormInputs = {
      ...formInputs,
      [`${e.target.name}_comment`]: value
    };
    recalculate(newFormInputs);
  };

  const onUncheckAll = filterRules => {
    let updateInputs = { ...formInputs };
    for (let i = 0; i < rules.length; i++) {
      if (
        filterRules(rules[i]) &&
        rules[i].code !== "STRATEGY_BIKE_4" &&
        rules[i].code !== "STRATEGY_PARKING_5"
      ) {
        if (updateInputs[rules[i].code]) {
          updateInputs[rules[i].code] = null;
        }
        // In addition to the rule value, also clear
        // the associated comment, if any
        if (updateInputs[rules[i].code + "_comment"]) {
          delete updateInputs[rules[i].code + "_comment"];
        }
      }
    }
    if (filterRules === filters.projectDescriptionRules) {
      setPartialAIN(""); // Clear incomplete AIN input
    }
    recalculate(updateInputs);
  };

  // resets wizard to empty for new project, or saved state for existing project.
  // In either case, navigate to first page
  const onResetProject = async () => {
    setPartialAIN(""); // In case there is a partial AIN entered, clear it
    await fetchRules();
    await initializeEngine();
    const firstPage = "/calculation/1" + (projectId ? `/${projectId}` : "/0");
    navigate(firstPage);
  };

  const projectIsValid = () => {
    return !rules.find(rule => !!rule.validationErrors);
  };

  const onSave = async () => {
    if (!projectIsValid()) {
      toast.add("Some project inputs are missing or invalid. Save failed.");
      return;
    }
    const inputsToSave = { ...formInputs };
    // If a saved form had inputs that are obsolete,
    // delete them from the inputsToSave object.
    for (let input in inputsToSave) {
      if (!inputsToSave[input]) {
        delete inputsToSave[input];
      }
    }

    const requestBody = {
      name: formInputs.PROJECT_NAME,
      address: formInputs.PROJECT_ADDRESS,
      description: formInputs.PROJECT_DESCRIPTION,
      formInputs: JSON.stringify(inputsToSave),
      targetPoints: getRuleByCode("TARGET_POINTS_PARK").value,
      earnedPoints: getRuleByCode("PTS_EARNED").value,
      projectLevel: getRuleByCode("PROJECT_LEVEL").value,
      loginId: account.id,
      calculationId: TdmCalculationContainer.calculationId
    };
    if (!requestBody.name) {
      toast.add("You must give the project a name before saving.");
      return;
    }
    if (projectId) {
      requestBody.id = projectId;
      try {
        await projectService.put(requestBody);
        setFormHasSaved(true);
        toast.add("Saved Project Changes");
        const projectResponse = await projectService.getById(projectId);
        setProject(projectResponse.data);
      } catch (err) {
        console.error(err);
        if (err.response) {
          if (err.response.status === 401) {
            toast.add(
              "For your security, your session has expired. Please log in again."
            );
            // User's session has expired, update state variable
            // to let React know they are logged out.
            userContext.updateAccount({});
            navigate(`/login/${encodeURIComponent(account.email)}`);
          } else {
            console.error(err.response);
          }
        } else if (err.request) {
          console.error(err.request);
        }
      }
    } else {
      try {
        const postResponse = await projectService.post(requestBody);
        // Update URL to /calculation/<currentPage>/<newProjectId>
        // to keep working on same project.

        const newPath = `/calculation/${location.pathname.split("/")[2]}/${
          postResponse.data.id
        }`;
        navigate(newPath, { replace: true });
        setFormHasSaved(true);
        toast.add("Saved New Project");
      } catch (err) {
        console.error(err);
        if (err.response) {
          if (err.response.status === 401) {
            toast.add(
              "For your security, your session has expired. Please log in again."
            );
            // User's session has expired, update state variable
            // to let React know they are logged out.
            userContext.updateAccount({});
            navigate(`/login/${encodeURIComponent(account.email)}`);
          } else {
            console.error(err.response);
          }
        } else if (err.request) {
          console.error(err.request);
        }
      }
    }
  };

  return (
    <TdmCalculationWizard
      projectLevel={projectLevel}
      rules={rules}
      partialAINInput={partialAIN}
      onInputChange={onInputChange}
      onPartialAINChange={onPartialAINChange}
      onCommentChange={onCommentChange}
      onUncheckAll={onUncheckAll}
      onResetProject={onResetProject}
      initializeStrategies={initializeStrategies}
      filters={filters}
      onParkingProvidedChange={onParkingProvidedChange}
      resultRuleCodes={resultRuleCodes}
      onSave={onSave}
      formIsDirty={!formHasSaved}
      projectIsValid={projectIsValid}
      contentContainerRef={contentContainerRef}
      inapplicableStrategiesModal={inapplicableStrategiesModal}
      closeStrategiesModal={closeStrategiesModal}
      project={project}
      shareView={shareView}
      initializeEngine={initializeEngine}
    />
  );
}

TdmCalculationContainer.calculationId = 1;

TdmCalculationContainer.propTypes = {
  contentContainerRef: PropTypes.object
};

export default TdmCalculationContainer;
