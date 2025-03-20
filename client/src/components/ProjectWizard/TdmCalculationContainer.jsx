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
  landUseRules: rule =>
    rule.category === "calculation" &&
    rule.calculationPanelId === 5 &&
    rule.display,
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

            if (projectResponse) {
              setShareView(true);
            }
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
          setShareView(false);
        }
        if (projectResponse) {
          setProject(projectResponse.data);
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
      // const errMessage = account.id
      //   ? "The project you are trying to view can only be viewed by the user."
      //   : "You must be logged in to view project.";
      // toast.add(errMessage);
      // const redirect = account.id ? "/projects" : "/login";
      // navigate(redirect);
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

  const landUseRules = rules && rules.filter(filters.landUseRules);

  const residentialPackageSelected = () => {
    // Only enable button if
    // component strategies are not already selected
    const strategyBike4 = rules.find(r => r.code === "STRATEGY_BIKE_4");
    const strategyInfo3 = rules.find(r => r.code === "STRATEGY_INFO_3");
    const strategyParking1 = rules.find(r => r.code === "STRATEGY_PARKING_1");
    return (
      strategyBike4 &&
      !!strategyBike4.value &&
      strategyInfo3 &&
      strategyInfo3.value >= 1 &&
      strategyParking1 &&
      strategyParking1.value >= 8
    );
  };

  const schoolPackageSelected = () => {
    // Only enable button if
    // component strategies are not already selected
    const strategyBike4 = rules.find(r => r.code === "STRATEGY_BIKE_4");
    const strategyHov4 = rules.find(r => r.code === "STRATEGY_HOV_4");
    const strategyInfo3 = rules.find(r => r.code === "STRATEGY_INFO_3");
    const strategyMobilityInvestment2 = rules.find(
      r => r.code === "STRATEGY_MOBILITY_INVESTMENT_2"
    );
    return (
      strategyBike4 &&
      !!strategyBike4.value &&
      strategyHov4 &&
      !!strategyHov4.value &&
      strategyInfo3 &&
      strategyInfo3.value >= 2 &&
      strategyMobilityInvestment2 &&
      strategyMobilityInvestment2.value >= 2
    );
  };

  const onPkgSelect = (pkgType, selected = true) => {
    const modifiedInputs = {};
    if (pkgType === "Residential") {
      if (selected) {
        modifiedInputs["STRATEGY_BIKE_4"] = true;
        if (rules.find(r => r.code === "STRATEGY_INFO_3").value < 1) {
          modifiedInputs["STRATEGY_INFO_3"] = 1;
        }
        // De-select Trip-Reduction Program
        modifiedInputs["STRATEGY_HOV_5"] = false;
        // Set Pricing/unbundling to 8
        modifiedInputs["STRATEGY_PARKING_1"] = 8;
      } else {
        // Do not alter Bike Parking setting
        // De-select Encouragement Program, unless
        // the school package is selected
        if (!schoolPackageSelected()) {
          modifiedInputs["STRATEGY_INFO_3"] = 0;
        }
        // Set Pricing/Unbundling to 0
        modifiedInputs["STRATEGY_PARKING_1"] = 0;
      }
    } else {
      // School Pkg
      if (selected) {
        modifiedInputs["STRATEGY_BIKE_4"] = true;
        if (rules.find(r => r.code === "STRATEGY_INFO_3").value <= 1) {
          modifiedInputs["STRATEGY_INFO_3"] = 2;
        }
        modifiedInputs["STRATEGY_MOBILITY_INVESTMENT_2"] = 2;
        modifiedInputs["STRATEGY_HOV_4"] = true;

        // De-select Trip-Reduction Program
        //modifiedInputs["STRATEGY_HOV_5"] = false;
      } else {
        // Do not alter Bike Parking setting
        // De-select Encouragement Program, unless
        // the residential package is selected
        if (!residentialPackageSelected()) {
          modifiedInputs["STRATEGY_INFO_3"] = 0;
        } else {
          modifiedInputs["STRATEGY_INFO_3"] = 1;
        }
        modifiedInputs["STRATEGY_MOBILITY_INVESTMENT_2"] = 0;
        modifiedInputs["STRATEGY_HOV_4"] = false;
      }
    }

    const newFormInputs = {
      ...formInputs,
      ...modifiedInputs
    };
    recalculate(newFormInputs);
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

  const allowResidentialPackage = (() => {
    const applicableLandUse = landUseRules.find(
      r =>
        r.code.startsWith("LAND_USE") && r.code !== "LAND_USE_SCHOOL" && r.value
    );
    const lowParkRatio = rules.find(
      r => r.code === "CALC_PARK_RATIO" && r.value < 110
    );
    return !!(projectLevel === 1 && applicableLandUse && lowParkRatio);
  })();

  const allowSchoolPackage = (() => {
    const triggerRule = landUseRules.filter(r => r.code === "LAND_USE_SCHOOL");
    const lowParkRatio = rules.find(
      r => r.code === "CALC_PARK_RATIO" && r.value < 110
    );
    return !!(
      projectLevel === 1 &&
      triggerRule[0] &&
      triggerRule[0].value &&
      lowParkRatio
    );
  })();

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

    const newFormInputs = {
      ...formInputs,
      [ruleCode]: value
    };
    applySideEffects(newFormInputs, ruleCode, value);

    recalculate(newFormInputs);
  };

  const onPartialAINChange = value => {
    setPartialAIN(value);
  };

  // If selecting a particular value for a particular rule needs to cause
  // a change to another input...
  const applySideEffects = (formInputs, ruleCode, value) => {
    switch (ruleCode) {
      case "STRATEGY_CAR_SHARE_3":
        // When Car Share membership is set to "Blue LA", automatically select
        // Car Sharing Electric Vehicle Bonus (issue #791)
        if (value === "2") {
          formInputs["STRATEGY_CAR_SHARE_ELECTRIC"] = true;
        } else {
          formInputs["STRATEGY_CAR_SHARE_ELECTRIC"] = false;
        }
        break;
      case "STRATEGY_AFFORDABLE":
        // When the Strategy Affordable housing is set to 100% Affordable,
        // The 100% Affordable Housing Input should be set to true
        if (value === "4") {
          formInputs["AFFORDABLE_HOUSING"] = true;
          // If < 50 residential units and Affordable Housing is changed to 100%,
          // then page 4 is no longer applicable, redirect to page 3.
          if (projectLevel <= 1) {
            const thirdPage =
              "/calculation/3" + (projectId ? `/${projectId}` : "/0");
            navigate(thirdPage);
          }
        } else {
          formInputs["AFFORDABLE_HOUSING"] = false;
        }
        break;
      case "AFFORDABLE_HOUSING":
        if (value === true) {
          formInputs["STRATEGY_AFFORDABLE"] = "4";
        } else {
          if (formInputs["STRATEGY_AFFORDABLE"] === "4") {
            formInputs["STRATEGY_AFFORDABLE"] = "";
          }
        }
        break;
    }
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
          updateInputs[rules[i].code + "_comment"] = null;
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
        let projectResponse = null;

        projectResponse = await projectService.getById(projectId);

        // setDateModified(formatDatetime(projectResponse.data?.dateModified));
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
      onPkgSelect={onPkgSelect}
      onParkingProvidedChange={onParkingProvidedChange}
      resultRuleCodes={resultRuleCodes}
      onSave={onSave}
      allowResidentialPackage={allowResidentialPackage}
      allowSchoolPackage={allowSchoolPackage}
      residentialPackageSelected={residentialPackageSelected}
      schoolPackageSelected={schoolPackageSelected}
      formIsDirty={!formHasSaved}
      projectIsValid={projectIsValid}
      contentContainerRef={contentContainerRef}
      inapplicableStrategiesModal={inapplicableStrategiesModal}
      closeStrategiesModal={closeStrategiesModal}
      project={project}
      shareView={shareView}
    />
  );
}

TdmCalculationContainer.calculationId = 1;

TdmCalculationContainer.propTypes = {
  contentContainerRef: PropTypes.object
};

export default TdmCalculationContainer;
