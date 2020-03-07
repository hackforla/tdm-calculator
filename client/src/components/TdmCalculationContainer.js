import React from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
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

class TdmCalculationContainer extends React.Component {
  engine = null;

  static contextType = ToastContext;

  // These are the calculation results we want to calculate
  // and display on the main page.
  resultRuleCodes = [
    "PROJECT_LEVEL",
    "CALC_PARK_RATIO",
    "TARGET_POINTS_PARK",
    "PTS_EARNED"
  ];

  state = {
    rules: [],
    formInputs: {},
    projectId: 0,
    loginId: 0, // Project creator's loginId
    view: "w", // "w" for wizard view, "d" for old default
    pageNo: 1
  };

  pushHistory = () => {
    const qs = queryString.stringify({
      view: this.state.view,
      pageNo: this.state.pageNo
    });
    const url = this.props.location.pathname + "?" + qs;
    this.props.history.push(url);
  };

  async componentDidMount() {
    const { pageNo, view } = queryString.parse(this.props.location.search);
    if (pageNo) {
      this.setState({ pageNo: Number(pageNo) });
    }
    if (view && view === "d") {
      this.setState({ view });
    }
    try {
      if (this.props.match.params.projectId) {
        const projectId = this.props.match.params.projectId;
        const projectResponse = await projectService.getById(projectId);
        this.setState({
          projectId: projectId ? Number(projectId) : null,
          loginId: projectResponse.data.loginId,
          formInputs: JSON.parse(projectResponse.data.formInputs)
        });
      }

      const ruleResponse = await ruleService.getByCalculationId(
        TdmCalculationContainer.calculationId
      );
      this.engine = new Engine(ruleResponse.data);
      // console.log("Calculation Rules:");
      // console.log(JSON.stringify(ruleResponse.data, null, 2));
      this.engine.run(this.state.formInputs, this.resultRuleCodes);
      this.setState({
        rules: this.engine.showRulesArray()
      });
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
    }
  }

  componentDidUpdate = async prevProps => {
    if (prevProps.location.search !== this.props.location.search) {
      let query = queryString.parse(this.props.location.search);
      if (query.pageNo) {
        this.setState({
          pageNo: parseInt(query.pageNo)
        });
      }
    }

    this.props.setIsCreatingNewProject(true);
  };

  componentWillUnmount = () => {
    this.props.setIsCreatingNewProject(false);
  };

  onPkgSelect = pkgType => {
    let pkgRules = [];
    if (pkgType === "Residential") {
      pkgRules = this.state.rules.filter(rule =>
        ["STRATEGY_BIKE_4", "STRATEGY_INFO_3", "STRATEGY_PARKING_1"].includes(
          rule.code
        )
      );
    } else {
      pkgRules = this.state.rules.filter(rule =>
        ["STRATEGY_BIKE_4", "STRATEGY_INFO_3", "STRATEGY_PARKING_2"].includes(
          rule.code
        )
      );
    }

    const modifiedInputs = pkgRules.reduce((changedProps, rule) => {
      changedProps[rule.code] = true;
      return changedProps;
    }, {});
    const formInputs = {
      ...this.state.formInputs,
      ...modifiedInputs
    };
    this.recalculate(formInputs);
  };

  getRuleByCode = ruleCode => {
    const rule = this.state.rules.find(rule => rule.code === ruleCode);
    if (rule === undefined) {
      throw new Error("Rule not found for code " + ruleCode);
    }
    return rule;
  };

  limitToInt = value => {
    return value.replace(/\D/g, "");
  };

  limitMinMax = (value, min, max) => {
    if (min !== null) {
      value = value < min ? min : value;
    }
    if (max !== null) {
      value = value > max ? max : value;
    }
    return value;
  };

  onInputChange = e => {
    const ruleCode = e.target.name;
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (!ruleCode) {
      throw new Error("Input is missing name attribute");
    }

    const rule = this.getRuleByCode(ruleCode);

    // Convert value to appropriate Data type
    if (rule.dataType === "number") {
      value = this.limitToInt(value);
      value = this.limitMinMax(value, rule.minValue, rule.maxValue);
      value = value === "0" ? "" : value;
    }

    const formInputs = {
      ...this.state.formInputs,
      [e.target.name]: value
    };
    this.recalculate(formInputs);
  };

  onUncheckAll = filterRules => {
    const { rules, formInputs } = this.state;
    let updateInputs = { ...formInputs };
    for (let i = 0; i < rules.length; i++) {
      if (filterRules(rules[i])) {
        if (updateInputs[rules[i].code]) {
          updateInputs[rules[i].code] = null;
        }
      }
    }
    this.recalculate(updateInputs);
  };

  onSave = async evt => {
    if (this.props.account.id !== this.loginId) {
      console.log(`Failed to save - user is not project owner.`);
      return;
    }

    // Only save inputs that have a value
    const inputsToSave = { ...this.state.formInputs };
    for (let input in inputsToSave) {
      console.log("input", inputsToSave[input]);
      if (!inputsToSave[input]) {
        delete inputsToSave[input];
      }
    }

    const requestBody = {
      name: this.state.formInputs.PROJECT_NAME,
      address: this.state.formInputs.PROJECT_ADDRESS,
      description: this.state.formInputs.PROJECT_DESCRIPTION,
      formInputs: JSON.stringify(inputsToSave),
      loginId: this.props.account.id,
      calculationId: TdmCalculationContainer.calculationId
    };
    if (!requestBody.name) {
      this.context.add("You must give the project a name before saving.");
      return;
    }
    if (this.state.projectId) {
      requestBody.id = this.state.projectId;
      try {
        await projectService.put(requestBody);
        this.context.add("Saved Project Changes");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const postResponse = await projectService.post(requestBody);
        this.setState(
          {
            projectId: postResponse.data.id,
            loginId: this.props.account.id
          },
          () => {
            this.context.add("Saved New Project");
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  recalculate = formInputs => {
    this.engine.run(formInputs, this.resultRuleCodes);
    const rules = this.engine.showRulesArray();
    // update state with modified formInputs and rules
    // const showWork = this.engine.showWork("PARK_REQUIREMENT");
    this.setState({ formInputs, rules });
  };

  filters = {
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

  render() {
    const { rules, view, projectId, loginId, pageNo } = this.state;
    const { account, classes } = this.props;
    return (
      <div className={classes.root}>
        {view === "w" ? (
          <TdmCalculationWizard
            rules={rules}
            onInputChange={this.onInputChange}
            onUncheckAll={this.onUncheckAll}
            filters={this.filters}
            onPkgSelect={this.onPkgSelect}
            resultRuleCodes={this.resultRuleCodes}
            onViewChange={() => this.setState({ view: "d" }, this.pushHistory)}
            onPageChange={pageNo => this.setState({ pageNo }, this.pushHistory)}
            account={account}
            projectId={Number(projectId)}
            loginId={loginId}
            onSave={this.onSave}
            pageNo={pageNo}
          />
        ) : (
          <TdmCalculation
            rules={rules}
            onInputChange={this.onInputChange}
            onUncheckAll={this.onUncheckAll}
            filters={this.filters}
            onPkgSelect={this.onPkgSelect}
            resultRuleCodes={this.resultRuleCodes}
            onViewChange={() => this.setState({ view: "w" }, this.pushHistory)}
          />
        )}

        {/* <pre>
          {JSON.stringify(
            rules.filter(r => r.used),
            null,
            2
          )}
        </pre> */}
      </div>
    );
  }
}

TdmCalculationContainer.calculationId = 1;

export default withRouter(injectSheet(styles)(TdmCalculationContainer));
