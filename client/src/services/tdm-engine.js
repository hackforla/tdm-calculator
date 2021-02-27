const REGEX_TOKEN = /<<[\w-]+?>>/gi;

// This service is the calculation engine for the app. It does not
// access a database but performs the service of performing calculations.
// It is pure ES6 and could be used server-side, should we decide to
// implement server-side rendering, or make the calculation available
// on the Express Web API server.
class Engine {
  constructor(rulesArray) {
    // We convert the array of rules to an
    // object as a dictionary for easy
    // access to rules by code value
    const rulesDictionary = {};
    for (let rule of rulesArray) {
      // Add properties to rule that aren't needed in CalculationRule table,
      // but are used for calculation and project storage purposes.
      rule.comment = "";
      rulesDictionary[rule.code] = rule;
    }
    this.initialRules = rulesDictionary;
    this.ruleCode = null;
    this.rules = {};
  }

  run(formInputs, ruleCodes) {
    try {
      for (let i = 0; i < ruleCodes.length; i++) {
        if (!this.initialRules[ruleCodes[i]]) {
          throw new Error("Rule " + ruleCodes[i] + " not found!");
        }
      }

      // Make a deep copy of initialRules, since the rules
      // will be mutated as the calculation proceeds.
      // Every time the calculation is run, it re-computes
      // everything frpom scratch for the requested ruleCodes.
      this.rules = JSON.parse(JSON.stringify(this.initialRules));
      // Merge Form Input values with other independent variables
      // in the calculation.
      for (const input in formInputs) {
        if (input.endsWith("_comment")) {
          const commentRuleCode = input.substr(
            0,
            input.length - "_comment".length
          );
          if (this.rules[commentRuleCode]) {
            this.rules[commentRuleCode].comment = formInputs[input];
          }
        }
        if (this.rules[input]) {
          this.rules[input].value = formInputs[input];
        }
      }

      // set display property of each input rule based upon displayFunctionBody
      for (const property in this.rules) {
        const rule = this.rules[property];
        // Start the calc with all properties.display = true
        // display is re-calculated below, after the recursive calc.
        rule.display = true;
        // if an input rule is not displayed, set its value to null
        if (!rule.display && rule.category === "input") {
          rule.value = null;
          // Also null out the formInput property
          formInputs[property] = null;
        }
      }

      // Recursively calculate the root rule
      const results = {};
      for (let i = 0; i < ruleCodes.length; i++) {
        results[ruleCodes[i]] = this.executeCalc(ruleCodes[i]);
      }

      // Now calculate the final display property value
      for (const property in this.rules) {
        this.calcDisplay(property);
      }

      // Match up inputs or measures with the primary calculation
      // they affect, for display next to input/measure
      for (const property in this.rules) {
        const rule = this.rules[property];
        const calcRule = this.rules[rule.calcCode];
        if (calcRule) {
          rule.calcValue = calcRule.value;
          rule.calcUnits = calcRule.units;
          rule.calcMinValue = calcRule.minValue;
          rule.calcMaxValue = calcRule.maxValue;
        } else {
          rule.calcValue = null;
          rule.calcUnits = null;
          rule.calcMinValue = null;
          rule.calcMaxValue = null;
        }
      }
      // Perform rule validation
      for (const property in this.rules) {
        this.validateRule(this.rules[property]);
      }
      // For debugging
      // console.log(this.rules);
      return results;
    } catch (err) {
      console.error(err);
    }
  }

  /// Evaluate validationFunctionBody and populate this.rules[property].display
  /// with a boolean indicating whether rule should be displayed (or hidden)
  calcValidation(property) {
    const rule = this.rules[property];
    const tokenArray = rule.validationFunctionBody.match(REGEX_TOKEN);
    let tokens = [];
    if (tokenArray && tokenArray.length > 0) {
      tokens = tokenArray.map(t => t.substr(2, t.length - 4));
      // console.log("tokens: " + JSON.stringify(tokens));
    }
    let functionBody = rule.validationFunctionBody;

    // Modify displayFunctionBody to replace tokens
    // with values
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const tokenRule = this.rules[token];
      if (!tokenRule) {
        console.error("Token not found: " + token);
      } else {
        let value;
        if (tokenRule.dataType === "string") {
          value = " '" + (tokenRule.value || "") + "' ";
        } else {
          value = " " + (tokenRule.value || 0) + " ";
        }

        functionBody = functionBody.replace("<<" + token + ">>", value);
      }
    }
    //console.log("functionBody: " + functionBody);
    try {
      return this.buildFunction(functionBody).call(this);
    } catch (error) {
      console.error(
        "Failed to build function for " + rule.code + " " + functionBody
      );
    }
  }

  validateRule(rule) {
    const {
      code,
      name,
      value,
      dataType,
      required,
      minStringLength,
      maxStringLength,
      minValue,
      maxValue,
      validationFunctionBody,
      displayComment,
      comment
    } = rule;
    const validationErrors = [];

    if (required && !value) {
      validationErrors.push(`${name} is required`);
    } else if (value) {
      if (minStringLength) {
        if (typeof value === "string" && value.length < minStringLength) {
          validationErrors.push(
            `${name} must be at least ${minStringLength} characters.`
          );
        }
      }
      if (maxStringLength) {
        if (typeof value === "string" && value.length > maxStringLength) {
          validationErrors.push(
            `${name} must be no more than ${maxStringLength} characters.`
          );
        }
      }
      if (
        dataType === "number" &&
        value !== null &&
        value !== "" &&
        minValue !== null
      ) {
        if (Number(value) < minValue) {
          validationErrors.push(`${name} must be at least ${minValue}.`);
        }
      }
      if (
        dataType === "number" &&
        value !== null &&
        value !== "" &&
        maxValue !== null
      ) {
        if (Number(value) > maxValue) {
          validationErrors.push(`${name} must be no more than ${maxValue}.`);
        }
      }
      if (displayComment && !comment) {
        validationErrors.push(`${name} nust include details.`);
      }
    }
    // Custom validation rules apply regardless of whether value is falsey
    if (validationFunctionBody) {
      const validationMessage = this.calcValidation(code);
      if (validationMessage) {
        validationErrors.push(validationMessage);
      }
    }

    // validationErrors will be null if no errors, otherwise contain
    // user-friendly error message(s) in an array
    rule.validationErrors =
      validationErrors.length > 0 ? validationErrors : null;
  }

  /// Evaluate displayFunctionBody and populate this.rules[property].display
  /// with a boolean indicating whether rule should be displayed (or hidden)
  calcDisplay(property) {
    const rule = this.rules[property];
    // if (property === "PARK_CONDO") {
    //   console.log(rule);
    // }
    // Extract rules that this one depends upon
    // from displayFunctionBody tokens
    const tokenArray = rule.displayFunctionBody.match(REGEX_TOKEN);
    let tokens = [];
    if (tokenArray && tokenArray.length > 0) {
      tokens = tokenArray.map(t => t.substr(2, t.length - 4));
      // console.log("tokens: " + JSON.stringify(tokens));
    }
    let displayFunctionBody = rule.displayFunctionBody;

    // Modify displayFunctionBody to replace tokens
    // with values
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const tokenRule = this.rules[token];
      if (!tokenRule) {
        console.error("Token not found: " + token);
      } else {
        let value;
        if (tokenRule.dataType === "string") {
          value = " '" + (tokenRule.value || "") + "' ";
        } else {
          value = " " + (tokenRule.value || 0) + " ";
        }

        displayFunctionBody = displayFunctionBody.replace(
          "<<" + token + ">>",
          value
        );
      }
    }
    //console.log("functionBody: " + functionBody);
    try {
      rule.display = this.buildFunction(displayFunctionBody).call(this);
    } catch (error) {
      console.error(
        "Failed to build function for " + rule.code + " " + displayFunctionBody
      );
    }
  }

  // Implements a safer alternative to javascript eval(), to
  // convert functionBody to execxutable function. See
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
  // React stil issues a warning, since it doesn't like
  // dynamically creating functions, but that's what we need.
  buildFunction(body) {
    // eslint-disable-next-line no-new-func
    return Function('"use strict";' + body);
  }

  executeCalc(ruleCode) {
    const rule = this.rules[ruleCode];
    // Set flag to indicate rule is used in calculation
    rule.used = true;
    if (rule.category === "calculation" && rule.functionBody) {
      //console.log("exeucteCalc: " + code);
      // Extract rules that this one depends upon
      // from functionBody tokens
      const tokens = rule.functionBody
        .match(REGEX_TOKEN)
        .map(t => t.substr(2, t.length - 4));
      //console.log("tokens: " + JSON.stringify(tokens));
      let functionBody = rule.functionBody;

      // Modify functionBody to calculate tokens that
      // are not already calculated
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const tokenRule = this.rules[token];
        if (!tokenRule) {
          console.error("Token not found: " + token);
        } else {
          if (
            tokenRule.category === "calculation" &&
            (tokenRule.value === undefined || tokenRule.value === null)
          ) {
            //value = " this.executeCalc('" + token + "') ";
            this.executeCalc(tokenRule.code);
          }

          let value;
          if (tokenRule.dataType === "string") {
            value = " '" + (tokenRule.value || "") + "' ";
          } else {
            value = " " + (tokenRule.value || 0) + " ";
          }
          tokenRule.used = true;

          functionBody = functionBody.replace("<<" + token + ">>", value);
        }
      }
      // Uncomment if statement and replace code value to debug specific
      // calculation
      // if (rule.code === "PROJECT_LEVEL") {
      //   console.log("functionBody: " + functionBody);
      // }

      try {
        rule.value = this.buildFunction(functionBody).call(this);
      } catch (error) {
        console.error(
          "Failed to build function for " + rule.code + functionBody
        );
      }
    }

    //console.log(rule.code + " = " + rule.value);
    return rule.value;
  }

  // Parses functionBody to extract ruleDependencies
  // as a String array of ruleCodes.
  getDependencies(rule) {
    if (!rule || !rule.functionBody) {
      return [];
    }
    return rule.functionBody
      .match(REGEX_TOKEN)
      .map(t => t.substr(2, t.length - 4));
  }

  showWork(ruleCode) {
    const workTree = { code: ruleCode, ...this.rules[ruleCode] };
    this.addDependencies(workTree);
    return workTree;
  }

  addDependencies(currentRule) {
    const dependencyRuleCodes = this.getDependencies(currentRule);

    currentRule.dependencies = dependencyRuleCodes
      .map(code => ({
        code,
        ...this.rules[code]
      }))
      .filter(rule => rule.used);

    for (let childNode of currentRule.dependencies) {
      this.addDependencies(childNode);
    }
  }

  showRules() {
    return JSON.parse(JSON.stringify(this.rules));
  }

  // Convert rules back into a simple array for
  // React to use or for persisting calculation
  // result to database.
  showRulesArray() {
    const rulesArray = [];
    // console.log("engine-show", this.rules);

    for (var ruleCode in this.rules) {
      rulesArray.push(this.rules[ruleCode]);
    }
    // console.log("rules array", rulesArray);
    return rulesArray;
  }
}

export default Engine;
