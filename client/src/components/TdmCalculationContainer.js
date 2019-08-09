import React from "react";
import TdmCalculation from "./TdmCalculation";
import * as ruleService from "../services/rule.service";
import Engine from "../services/tdm-engine";

class TdmCalculationContainer extends React.Component {
  calculationId = 1;
  engine = null;

  // These are the calculation results we want to calculate
  // and display on the main page.
  resultRuleCodes = [
    "PTS_DIFFERENCE",
    "PTS_EARNED",
    "TARGET_POINTS_PARK",
    "PARK_REQUIREMENT"
  ];

  state = {
    rules: [],
    formInputs: {}
  };

  componentDidMount() {
    ruleService
      .getByCalculationId(this.calculationId)
      .then(response => {
        console.log(response.data);
        this.engine = new Engine(response.data);
        this.engine.run(this.state.formInputs, this.resultRuleCodes);
        this.setState({
          rules: this.engine.showRulesArray()
        });
      })
      .catch(err => {
        //console.log(JSON.stringify(err, null, 2));
      });
  }

  onInputChange = e => {
    const ruleCode = e.target.name;
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (!ruleCode) {
      throw new Error("Input is missing name attribute");
    }
    const rule = this.state.rules.filter(rule => rule.code === ruleCode);
    if (!rule) {
      throw new Error("Rule not found for code " + ruleCode);
    }

    // Convert value to appropriate Data type
    if (rule.dataType === "number") {
      value = value ? Number.parseFloat(value) : 0;
    }

    const formInputs = {
      ...this.state.formInputs,
      [e.target.name]: value
    };
    this.engine.run(formInputs, this.resultRuleCodes);
    const rules = this.engine.showRulesArray();
    // update state with modified formInputs and rules
    this.setState({ formInputs, rules });
  };

  render() {
    const { rules } = this.state;
    return (
      <TdmCalculation
        rules={rules}
        onInputChange={this.onInputChange}
        resultRuleCodes={this.resultRuleCodes}
      />
    );
  }
}

export default TdmCalculationContainer;
