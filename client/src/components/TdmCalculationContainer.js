import React from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import TdmCalculation from "./ProjectSinglePage/TdmCalculation";
import TdmCalculationWizard from "./ProjectWizard/TdmCalculationWizard";
import * as ruleService from "../services/rule.service";
import * as projectService from "../services/project.service";
import Engine from "../services/tdm-engine";
import ToastContext from "../contexts/Toast/ToastContext";

class TdmCalculationContainer extends React.Component {
  calculationId = 1;
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
        console.log(projectResponse.data);
        this.setState({
          projectId,
          loginId: projectResponse.data.loginId,
          formInputs: JSON.parse(projectResponse.data.formInputs)
        });
      }

      const ruleResponse = await ruleService.getByCalculationId(
        this.calculationId
      );
      console.log(ruleResponse.data);
      this.engine = new Engine(ruleResponse.data);
      this.engine.run(this.state.formInputs, this.resultRuleCodes);
      this.setState({
        rules: this.engine.showRulesArray()
      });
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
    }
  }

  componentDidUpdate = async (prevProps) => {
    if (prevProps.location.search !== this.props.location.search) {
      let query = queryString.parse(this.props.location.search)
      if (query.pageNo) {
        this.setState({
          pageNo: parseInt(query.pageNo)
        })
      }
    }
  }

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
      value = value ? Number.parseFloat(value) : 0;
      value = this.limitMinMax(value, rule.minValue, rule.maxValue);
    }

    const formInputs = {
      ...this.state.formInputs,
      [e.target.name]: value
    };
    this.recalculate(formInputs);
  };

  onSave = async evt => {
    const requestBody = {
      name: this.state.formInputs.PROJECT_NAME,
      address: this.state.formInputs.PROJECT_ADDRESS,
      description: this.state.formInputs.PROJECT_DESCRIPTION,
      formInputs: JSON.stringify(this.state.formInputs),
      loginId: this.props.account.id,
      calculationId: this.calculationId
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

  render() {
    const { rules, view, projectId, loginId, pageNo } = this.state;
    const { account } = this.props;
    return (
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {view === "w" ? (
          <TdmCalculationWizard
            rules={rules}
            onInputChange={this.onInputChange}
            onPkgSelect={this.onPkgSelect}
            resultRuleCodes={this.resultRuleCodes}
            onViewChange={() => this.setState({ view: "d" }, this.pushHistory)}
            onPageChange={pageNo => this.setState({ pageNo }, this.pushHistory)}
            account={account}
            projectId={projectId}
            loginId={loginId}
            onSave={this.onSave}
            pageNo={pageNo}
          />
        ) : (
          <TdmCalculation
            rules={rules}
            onInputChange={this.onInputChange}
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

export default withRouter(TdmCalculationContainer);
