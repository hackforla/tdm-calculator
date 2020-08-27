/* eslint-disable linebreak-style */
import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TdmCalculation from "./ProjectSinglePage/TdmCalculation";
import TdmCalculationWizard from "./ProjectWizard/TdmCalculationWizard";
import * as ruleService from "../services/rule.service";
import * as projectService from "../services/project.service";
import Engine from "../services/tdm-engine";
import ToastContext from "../contexts/Toast/ToastContext";
import injectSheet from "react-jss";
import { useToast } from "../contexts/Toast";

const styles = {
  root: {
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

export function TdmCalculationContainer(props) {
  const { history, account, classes } = props;
  const context = useContext(ToastContext);
  const [engine, setEngine] = useState(null);
  const [rules, setRules] = useState([]);
  const [formInputs, setFormInputs] = useState({});
  const [projectId, setProjectId] = useState(null);
  const [loginId, setLoginId] = useState(0);
  const [view, setView] = useState("w");
  const [strategiesInitialized, setStrategiesInitialized] = useState(false);
  const toast = useToast();

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
      const projectId = Number(props.match.params.projectId) || null;
      setProjectId(projectId ? Number(projectId) : null);
      try {
        let projectResponse = null;
        let inputs = {};
        if (Number(projectId) > 0 && account.id) {
          projectResponse = await projectService.getById(projectId);
          setLoginId(projectResponse.data.loginId);
          // console.log("inputs", projectResponse);
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
        const errMessage = account.id
          ? "The project you are trying to view can only be viewed by the user."
          : "You must be logged in to view project.";
        const redirect = account.id ? "/projects" : "/login";
        toast.add(errMessage);
        history.push(redirect);
      }
    };
    initiateEngine();
  }, [props.match.params.projectId, engine, account]);

  const recalculate = formInputs => {
    engine.run(formInputs, resultRuleCodes);
    const rules = engine.showRulesArray();
    //The following several lines can be uncommented for debugging
    // console.log("Updated Rules:");
    // console.log(rules);
    // const showWork = engine.showWork("PARK_REQUIREMENT");
    // console.log("Show Work:");
    // console.log(showWork);

    // update state with modified formInputs and rules
    setFormInputs(formInputs);
    setRules(rules);
  };

  const initializeStrategies = () => {
    if (!strategiesInitialized) {
      onInputChange({ target: { name: "STRATEGY_BIKE_4", value: true } });
      setStrategiesInitialized(true);
    }
  };

  const onPkgSelect = pkgType => {
    let pkgRules = [];
    if (pkgType === "Residential") {
      pkgRules = rules.filter(rule =>
        [
          "STRATEGY_BIKE_4",
          "STRATEGY_INFO_3",
          "STRATEGY_PARKING_1",
          "STRATEGY_HOV_5"
        ].includes(rule.code)
      );
    } else {
      pkgRules = rules.filter(rule =>
        [
          "STRATEGY_BIKE_4",
          "STRATEGY_INFO_3",
          "STRATEGY_PARKING_2",
          "STRATEGY_HOV_5"
        ].includes(rule.code)
      );
    }

    const modifiedInputs = pkgRules.reduce((changedProps, rule) => {
      if (rule.code === "STRATEGY_INFO_3") {
        // For Education, Marketing, and Outreach, set to "basic" if not already
        // set to non-zero value
        changedProps[rule.code] =
          !rule.value || rule.value === "0" ? 1 : rule.value;
      } else if (rule.code === "STRATEGY_HOV_5") {
        // If a package is selected, de-select the Mandatory Trip-Reduction Program
        changedProps[rule.code] = false;
      } else if (rule.code === "STRATEGY_PARKING_1") {
        // For Pricing/Unbundling, set to 8 if not
        // already set to 8
        changedProps[rule.code] =
          !rule.value || rule.value < 8 ? 8 : rule.value;
      } else {
        changedProps[rule.code] = true;
      }
      return changedProps;
    }, {});
    const newFormInputs = {
      ...formInputs,
      ...modifiedInputs
    };
    recalculate(newFormInputs);
  };

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

  const limitMinMax = (value, min, max) => {
    if (min !== null) {
      value = value < min ? min : value;
    }
    if (max !== null) {
      value = value > max ? max : value;
    }
    return value;
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
      value = limitMinMax(value, rule.minValue, rule.maxValue);
      value = value === "0" ? "" : value;
    }

    const newFormInputs = {
      ...formInputs,
      [e.target.name]: value
    };
    recalculate(newFormInputs);
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

  const onSave = async () => {
    const inputsToSave = { ...formInputs };
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
      loginId: props.account.id,
      calculationId: TdmCalculationContainer.calculationId
    };
    if (!requestBody.name) {
      context.add("You must give the project a name before saving.");
      return;
    }
    if (projectId) {
      requestBody.id = projectId;
      try {
        await projectService.put(requestBody);
        context.add("Saved Project Changes");
      } catch (err) {
        if (err.response) {
          if (err.response.status === 401) {
            toast.add(
              "For your security, your session has expired. Please log in again."
            );
            history.push(`/login/${encodeURIComponent(account.email)}`);
          } else {
            console.error(err.response);
          }
        } else if (err.request) {
          console.error(err.request);
        }
        console.error(err);
      }
    } else {
      try {
        const postResponse = await projectService.post(requestBody);
        setProjectId(postResponse.data.id);
        setLoginId(props.account.id);
        context.add("Saved New Project");
      } catch (err) {
        if (err.response) {
          if (err.response.status === 401) {
            toast.add(
              "For your security, your session has expired. Please log in again."
            );
            history.push(`/login/${encodeURIComponent(account.email)}`);
          } else {
            console.error(err.response);
          }
        } else if (err.request) {
          console.error(err.request);
        }
        console.error(err);
      }
    }
  };

  const filters = {
    projectDescriptionRules: rule =>
      rule.category === "input" &&
      rule.calculationPanelId === 31 &&
      rule.display,
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
  return (
    <div className={classes.root}>
      {view === "w" ? (
        <TdmCalculationWizard
          rules={rules}
          onInputChange={onInputChange}
          onCommentChange={onCommentChange}
          onUncheckAll={onUncheckAll}
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
    push: PropTypes.func.isRequired
  }),
  classes: PropTypes.object.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string
  })
};

export default withRouter(injectSheet(styles)(TdmCalculationContainer));
