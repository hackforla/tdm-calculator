/* eslint-disable linebreak-style */
import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Prompt, withRouter } from "react-router-dom";
import TdmCalculation from "./ProjectSinglePage/TdmCalculation";
import TdmCalculationWizard from "./ProjectWizard/TdmCalculationWizard";
import * as ruleService from "../services/rule.service";
import * as projectService from "../services/project.service";
import Engine from "../services/tdm-engine";
import injectSheet from "react-jss";
import { useToast } from "../contexts/Toast";
import moment from "moment";
import {
  useAppInsightsContext,
  useTrackMetric,
  useTrackEvent
} from "@microsoft/applicationinsights-react-js";

const styles = {
  tdmCalculationContainer: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column"
  }
};

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

export function TdmCalculationContainer({
  history,
  match,
  account,
  classes,
  hasConfirmedNavTransition,
  isOpenNavConfirmModal,
  setLoggedInAccount,
  contentContainerRef,
  checklistModalOpen,
  toggleChecklistModal
}) {
  const [engine, setEngine] = useState(null);
  const [rules, setRules] = useState([]);
  const [formInputs, setFormInputs] = useState({});
  const [projectId, setProjectId] = useState(null);
  const [loginId, setLoginId] = useState(0);
  const [dateModified, setDateModified] = useState(null);
  const [view, setView] = useState("w");
  const [strategiesInitialized, setStrategiesInitialized] = useState(false);
  const [formHasSaved, setFormHasSaved] = useState(true);
  const [resettingProject, setResettingProject] = useState(false);
  const [triggerInitiateEngine, setTriggerInitiateEngine] = useState(false);
  const [inapplicableStrategiesModal, setInapplicableStrategiesModal] =
    useState(false);
  const toast = useToast();
  const appInsights = useAppInsightsContext();

  // appInsights.trackMetric("TDMCalculationContainer Component");
  const trackNew = useTrackEvent(appInsights, "New Project");
  const trackSave = useTrackEvent(appInsights, "Saved Project");
  const trackComponent = useTrackMetric(appInsights, "TdmCalculationContainer");

  // Get the rules for the calculation. Runs once when
  // component is loaded.
  useEffect(() => {
    const getRules = async () => {
      const ruleResponse = await ruleService.getByCalculationId(
        TdmCalculationContainer.calculationId
      );
      // console.log(ruleResponse.data);
      setEngine(new Engine(ruleResponse.data));
    };
    getRules();
  }, []);

  // Initialize the engine with saved project data, as appropriate.
  // Should run only when projectId changes.
  useEffect(() => {
    const initiateEngine = async () => {
      // Only run if engine has been instantiated
      if (!engine) return;
      // If projectId param is not defined, projectId
      // will be assigned the string "undefined" - ugh!
      const projectId = Number(match.params.projectId) || null;
      setProjectId(projectId ? Number(projectId) : null);
      try {
        let projectResponse = null;
        let inputs = {};
        if (Number(projectId) > 0 && account.id) {
          projectResponse = await projectService.getById(projectId);
          setLoginId(projectResponse.data.loginId);
          setDateModified(
            moment(projectResponse.data.dateModified).format(
              "MM/DD/YYYY h:mm A"
            )
          );
          inputs = JSON.parse(projectResponse.data.formInputs);
          setStrategiesInitialized(true);
        } else {
          setStrategiesInitialized(false);
        }
        engine.run(inputs, resultRuleCodes);
        setFormInputs(inputs);
        setRules(engine.showRulesArray());
      } catch (err) {
        console.error(JSON.stringify(err, null, 2));
        // const errMessage = account.id
        //   ? "The project you are trying to view can only be viewed by the user."
        //   : "You must be logged in to view project.";
        // toast.add(errMessage);
        const redirect = account.id ? "/projects" : "/login";
        history.push(redirect);
      }
    };
    initiateEngine();
  }, [match.params.projectId, engine, account, history, triggerInitiateEngine]);

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
    const strategyInfo5 = rules.find(r => r.code === "STRATEGY_INFO_5");
    return (
      strategyBike4 &&
      !!strategyBike4.value &&
      strategyHov4 &&
      !!strategyHov4.value &&
      strategyInfo3 &&
      strategyInfo3.value >= 2 &&
      strategyInfo5 &&
      !!strategyInfo5.value
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
        modifiedInputs["STRATEGY_INFO_5"] = true;
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
        modifiedInputs["STRATEGY_INFO_5"] = false;
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

  // If selecting a particular value for a particular rule needs to cause
  // a change to another input...
  const applySideEffects = (formInputs, ruleCode, value) => {
    switch (ruleCode) {
      case "STRATEGY_CAR_SHARE_3":
        // When Car Share membership is set to "Blue LA", automatically select
        // Car Sharing Electric Vehicle Bonus (issue #791)
        if (value === "2") {
          formInputs["STRATEGY_CAR_SHARE_ELECTRIC"] = true;
        }
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
      if (filterRules(rules[i]) && rules[i].code !== "STRATEGY_BIKE_4") {
        if (updateInputs[rules[i].code]) {
          updateInputs[rules[i].code] = null;
        }
      }
    }
    recalculate(updateInputs);
  };

  useEffect(() => {
    if (isOpenNavConfirmModal) return;

    if (hasConfirmedNavTransition) {
      setTriggerInitiateEngine(state => !state);
      setFormHasSaved(true);
    }
    setResettingProject(false);
  }, [hasConfirmedNavTransition, isOpenNavConfirmModal]);

  const navToStart = useCallback(() => {
    const firstPage = "/calculation/1" + (projectId ? `/${projectId}` : "");
    history.push(firstPage);
  }, [history, projectId]);

  useEffect(() => {
    if (resettingProject) navToStart();
  }, [resettingProject, navToStart]);

  const onResetProject = () => {
    setResettingProject(true);
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
        trackSave({ projectId });
        window.dataLayer.push({
          event: "customEvent",
          action: "save project",
          value: projectId
        });
        setFormHasSaved(true);
        toast.add("Saved Project Changes");
        let projectResponse = null;
        projectResponse = await projectService.getById(projectId);
        setDateModified(
          moment(projectResponse.data.dateModified).format("MM/DD/YYYY h:mm A")
        );
      } catch (err) {
        console.error(err);
        if (err.response) {
          if (err.response.status === 401) {
            toast.add(
              "For your security, your session has expired. Please log in again."
            );
            // User's session has expired, update state variable
            // to let React know they are logged out.
            setLoggedInAccount({});
            history.push(`/login/${encodeURIComponent(account.email)}`);
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
        trackNew({ projectId: postResponse.data.id });
        const newPath = history.location.pathname + "/" + postResponse.data.id;
        window.dataLayer.push({
          event: "customEvent",
          action: "save project",
          value: null
        });
        // Update URL to /calculation/<currentPage>/<newProjectId>
        // to keep working on same project.
        history.push(newPath);
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
            setLoggedInAccount({});
            history.push(`/login/${encodeURIComponent(account.email)}`);
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
    <div className={classes.tdmCalculationContainer} onClick={trackComponent}>
      <Prompt
        when={!formHasSaved || resettingProject}
        message={location => {
          return location.pathname.startsWith("/calculation") &&
            !resettingProject
            ? true // returning true allows user to continue without a prompt/modal
            : "this message doesn't actaully show, but will cause modal to open";
        }}
      />
      {view === "w" ? (
        <TdmCalculationWizard
          projectLevel={projectLevel}
          rules={rules}
          onInputChange={onInputChange}
          onCommentChange={onCommentChange}
          onUncheckAll={onUncheckAll}
          onResetProject={onResetProject}
          initializeStrategies={initializeStrategies}
          filters={filters}
          onPkgSelect={onPkgSelect}
          onParkingProvidedChange={onParkingProvidedChange}
          resultRuleCodes={resultRuleCodes}
          onViewChange={() => {
            setView("d");
          }}
          account={account}
          loginId={loginId}
          onSave={onSave}
          allowResidentialPackage={allowResidentialPackage}
          allowSchoolPackage={allowSchoolPackage}
          residentialPackageSelected={residentialPackageSelected}
          schoolPackageSelected={schoolPackageSelected}
          formIsDirty={!formHasSaved}
          projectIsValid={projectIsValid}
          dateModified={dateModified}
          contentContainerRef={contentContainerRef}
          checklistModalOpen={checklistModalOpen}
          toggleChecklistModal={toggleChecklistModal}
          inapplicableStrategiesModal={inapplicableStrategiesModal}
          closeStrategiesModal={closeStrategiesModal}
        />
      ) : (
        <TdmCalculation
          rules={rules}
          onInputChange={onInputChange}
          onCommentChange={onCommentChange}
          onUncheckAll={onUncheckAll}
          filters={filters}
          onPkgSelect={onPkgSelect}
          resultRuleCodes={resultRuleCodes}
          onViewChange={() => {
            setView("w");
          }}
        />
      )}
    </div>
  );
}

TdmCalculationContainer.calculationId = 1;

TdmCalculationContainer.propTypes = {
  account: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    id: PropTypes.number,
    email: PropTypes.string
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string,
      projectId: PropTypes.string
    })
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string
    })
  }),
  classes: PropTypes.object.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string
  }),
  hasConfirmedNavTransition: PropTypes.bool,
  isOpenNavConfirmModal: PropTypes.bool,
  setLoggedInAccount: PropTypes.func,
  contentContainerRef: PropTypes.object,
  checklistModalOpen: PropTypes.bool,
  toggleChecklistModal: PropTypes.func
};

export default withRouter(injectSheet(styles)(TdmCalculationContainer));
