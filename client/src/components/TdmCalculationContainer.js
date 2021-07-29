/* eslint-disable linebreak-style */
import React, { useEffect, useState } from "react";
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
    rule.category === "measure" && rule.calculationPanelId !== 10
};

export function TdmCalculationContainer({
  history,
  match,
  account,
  classes,
  setLoggedInAccount,
  contentContainerRef
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
          moment(projectResponse.data.dateModified).format("MM/DD/YYYY h:mm A")
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
  // Initialize the engine with saved project data, as appropriate.
  // Should run only when projectId changes.
  useEffect(() => {
    initiateEngine();
  }, [match.params.projectId, engine, account, history]);

  const recalculate = updatedFormInputs => {
    engine.run(updatedFormInputs, resultRuleCodes); //TODO cannot read property 'run' on null when switching from calculation to public form to create project
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
      !!strategyInfo3.value &&
      strategyParking1 &&
      strategyParking1.value === 8
    );
  };

  const employmentPackageSelected = () => {
    // Only enable button if
    // component strategies are not already selected
    const pkgRules = rules.filter(rule =>
      ["STRATEGY_BIKE_4", "STRATEGY_INFO_3", "STRATEGY_PARKING_2"].includes(
        rule.code
      )
    );

    const strategyCount = pkgRules.reduce(
      (count, r) => count + (r.value && r.value !== "0" ? 1 : 0),
      0
    );
    return strategyCount === 3;
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
        // the employment package is selected
        if (!employmentPackageSelected()) {
          modifiedInputs["STRATEGY_INFO_3"] = 0;
        }
        // Set Pricing/Unbundling to 0
        modifiedInputs["STRATEGY_PARKING_1"] = 0;
      }
    } else {
      // Employment Pkg
      if (selected) {
        modifiedInputs["STRATEGY_BIKE_4"] = true;
        if (rules.find(r => r.code === "STRATEGY_INFO_3").value < 1) {
          modifiedInputs["STRATEGY_INFO_3"] = 1;
        }
        // De-select Trip-Reduction Program
        modifiedInputs["STRATEGY_HOV_5"] = false;
        // Set parking cashout true
        modifiedInputs["STRATEGY_PARKING_2"] = true;
      } else {
        // Do not alter Bike Parking setting
        // De-select Encouragement Program, unless
        // the employment package is selected
        if (!residentialPackageSelected()) {
          modifiedInputs["STRATEGY_INFO_3"] = 0;
        }
        // Set Parking cashout false
        modifiedInputs["STRATEGY_PARKING_2"] = false;
      }
    }

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
    // Only show button if one of the land uses is Residential
    const triggerRule = landUseRules.filter(
      r => r.code === "LAND_USE_RESIDENTIAL"
    );
    return projectLevel === 1 && triggerRule[0] && !!triggerRule[0].value;
  })();

  const allowEmploymentPackage = (() => {
    // Only show button if Parking Cash-Out strategy is available
    const triggerRule = rules.filter(r => r.code === "STRATEGY_PARKING_2");
    return projectLevel === 1 && triggerRule[0] && triggerRule[0].display;
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
    const ruleCode = e.target.name;
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (!ruleCode) {
      throw new Error("Input is missing name attribute");
    }

    const rule = getRuleByCode(ruleCode);

    // Convert value to appropriate Data type
    if (rule.dataType === "number") {
      value = limitToInt(value);
      //value = limitMinMax(value, rule.minValue, rule.maxValue);
      value = value === "0" ? "" : value;
    }

    const newFormInputs = {
      ...formInputs,
      [e.target.name]: value
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

  const onResetProject = () => {
    initiateEngine();
    history.push(`/calculation/1/${projectId}`);
    setFormHasSaved(true);
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
        when={!formHasSaved && !!account.id}
        message={location => {
          return location.pathname.startsWith("/calculation")
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
          resultRuleCodes={resultRuleCodes}
          onViewChange={() => {
            setView("d");
          }}
          account={account}
          loginId={loginId}
          onSave={onSave}
          allowResidentialPackage={allowResidentialPackage}
          allowEmploymentPackage={allowEmploymentPackage}
          residentialPackageSelected={residentialPackageSelected}
          employmentPackageSelected={employmentPackageSelected}
          formIsDirty={!formHasSaved}
          projectIsValid={projectIsValid}
          dateModified={dateModified}
          contentContainerRef={contentContainerRef}
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
  setLoggedInAccount: PropTypes.func,
  contentContainerRef: PropTypes.object
};

export default withRouter(injectSheet(styles)(TdmCalculationContainer));
