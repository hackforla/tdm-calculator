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

const styles = {
  root: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column"
  }
};

export function TdmCalculationContainer(props) {
  const context = useContext(ToastContext);

  // These are the calculation results we want to calculate
  // and display on the main page.
  const resultRuleCodes = [
    "PROJECT_LEVEL",
    "CALC_PARK_RATIO",
    "TARGET_POINTS_PARK",
    "PTS_EARNED"
  ];

  const [rules, setRules] = useState([]);
  const [formInputs, setFormInputs] = useState({});
  const [projectId, setProjectId] = useState("");
  const [loginId, setLoginId] = useState(0);
  const [view, setView] = useState("w");
  const [pageNo, setPageNo] = useState(1);

  const pushHistory = () => {
    props.history.push(`/calculation/${pageNo}/${projectId}`);
  };

  const getRules = async () => {
    const ruleResponse = await ruleService.getByCalculationId(
      TdmCalculationContainer.calculationId
    );
    TdmCalculationContainer.engine = new Engine(ruleResponse.data);
    TdmCalculationContainer.engine.run(formInputs, resultRuleCodes);
    setRules(TdmCalculationContainer.engine.showRulesArray());
  };

  useEffect(() => {
    const initiateEngine = async () => {
      const { params } = props.match;
      try {
        if (params.projectId) {
          const projectId = props.match.params.projectId;
          const projectResponse = await projectService.getById(projectId);
          setProjectId(projectId ? Number(projectId) : null);
          setLoginId(projectResponse.data.loginId);
          setFormInputs(JSON.parse(projectResponse.data.formInputs));
        }

        const ruleResponse = await ruleService.getByCalculationId(
          TdmCalculationContainer.calculationId
        );
        TdmCalculationContainer.engine = new Engine(ruleResponse.data);
        TdmCalculationContainer.engine.run(formInputs, resultRuleCodes);
        setRules(TdmCalculationContainer.engine.showRulesArray());
        // });
      } catch (err) {
        console.log(JSON.stringify(err, null, 2));
      }
      getRules();
    };
    initiateEngine();
  }, []);

  const onPkgSelect = pkgType => {
    let pkgRules = [];
    if (pkgType === "Residential") {
      pkgRules = rules.filter(rule =>
        ["STRATEGY_BIKE_4", "STRATEGY_INFO_3", "STRATEGY_PARKING_1"].includes(
          rule.code
        )
      );
    } else {
      pkgRules = rules.filter(rule =>
        ["STRATEGY_BIKE_4", "STRATEGY_INFO_3", "STRATEGY_PARKING_2"].includes(
          rule.code
        )
      );
    }

    const modifiedInputs = pkgRules.reduce((changedProps, rule) => {
      changedProps[rule.code] = true;
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

  const onUncheckAll = filterRules => {
    let updateInputs = { ...formInputs };
    for (let i = 0; i < rules.length; i++) {
      if (filterRules(rules[i])) {
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
      console.log("input", inputsToSave[input]);
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
        console.log(err);
      }
    } else {
      try {
        const postResponse = await projectService.post(requestBody);
        setProjectId(postResponse.data.id);
        setLoginId(props.account.id);
        context.add("Saved New Project");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const recalculate = formInputs => {
    TdmCalculationContainer.engine.run(formInputs, resultRuleCodes);
    const rules = TdmCalculationContainer.engine.showRulesArray();
    // update state with modified formInputs and rules
    // const showWork = this.engine.showWork("PARK_REQUIREMENT");
    setFormInputs(formInputs);
    setRules(rules);
  };

  const handleValidate = () => {
    const validations = {
      1: () => true,
      2: () => {
        let selected = false;
        let landUseRules = rules.filter(filters.landUseRules);
        landUseRules.forEach(val => {
          if (val.value === true) {
            selected = true;
          }
        });
        return selected;
      },
      3: () => true,
      4: () => true,
      5: () => true
    };

    return validations[props.match.params.page]();
  };

  const onPageChange = pageNo => {
    console.log("pageNo", pageNo);
    const { page, projectId } = props.match.params;
    const projectIdParam = projectId ? `/${projectId}` : "";
    if (Number(pageNo) > Number(props.match.params.page)) {
      if (handleValidate()) {
        setPageNo(pageNo);
        props.history.push(`/calculation/${Number(page) + 1}${projectIdParam}`);
      }
    } else {
      setPageNo(pageNo);
      props.history.push(`/calculation/${Number(page) - 1}${projectIdParam}`);
    }
  };

  const filters = {
    projectDescriptionRules: rule =>
      rule.category === "input" &&
      rule.calculationPanelId === 31 &&
      rule.used &&
      rule.display,
    landUseRules: rule =>
      rule.category === "input" &&
      rule.calculationPanelId === 5 &&
      rule.used &&
      rule.display,
    specificationRules: rule =>
      rule.category === "input" &&
      rule.calculationPanelId !== 5 &&
      rule.calculationPanelId !== 31 &&
      rule.used &&
      rule.display,
    targetPointRules: rule =>
      rule.category === "measure" &&
      rule.used &&
      rule.display &&
      rule.calculationPanelId === 10,
    strategyRules: rule =>
      rule.category === "measure" &&
      rule.used &&
      rule.display &&
      rule.calculationPanelId !== 10
  };

  const { account, classes } = props;
  return (
    <div className={classes.root}>
      {view === "w" ? (
        <TdmCalculationWizard
          rules={rules}
          onInputChange={onInputChange}
          onUncheckAll={onUncheckAll}
          filters={filters}
          onPkgSelect={onPkgSelect}
          resultRuleCodes={resultRuleCodes}
          onViewChange={() => {
            setView("d");
            pushHistory();
          }}
          onPageChange={onPageChange}
          account={account}
          projectId={Number(projectId)}
          loginId={loginId}
          onSave={onSave}
        />
      ) : (
        <TdmCalculation
          rules={rules}
          onInputChange={onInputChange}
          onUncheckAll={onUncheckAll}
          filters={filters}
          onPkgSelect={onPkgSelect}
          resultRuleCodes={resultRuleCodes}
          onViewChange={() => {
            setView("w");
            pushHistory();
          }}
        />
      )}
    </div>
  );
}

TdmCalculationContainer.calculationId = 1;
TdmCalculationContainer.engine = null;

TdmCalculationContainer.propTypes = {
  account: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    id: PropTypes.number
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
