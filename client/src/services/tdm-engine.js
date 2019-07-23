class Engine {
  constructor(rulesArray) {
    // We convert the array of rules to an
    // object as a dictionary for easy
    // access to rules by code value
    const rulesDictionary = {};
    for (let rule of rulesArray) {
      rulesDictionary[rule.code] = rule;
    }
    this.initialRules = rulesDictionary;
    this.ruleCode = null;
    this.rules = {};
  }

  run(formInputs, ruleCodes) {
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
      if (this.rules[input]) {
        this.rules[input].value = formInputs[input];
      } else {
        // Should it be a fatal error if inputRules
        // include non-existent rule code property?
        throw new Error("Invalid input: " + input);
      }
    }

    // Recursively calculate the root rule
    const results = {};
    for (let i = 0; i < ruleCodes.length; i++) {
      results[ruleCodes[i]] = this.executeCalc(ruleCodes[i]);
    }
    return results;
  }

  // Implements a safer alternative to javascript eval(), to
  // convert functionBody to execxutable function. See
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
  // React stil issues a warning, since it doesn't like
  // dynamically creating functions, but that's what we need.
  buildFunction(body) {
    return Function('"use strict";' + body);
  }

  executeCalc(code) {
    const rule = this.rules[code];
    // Set flag to indicate rule is used in calculation
    rule.used = true;
    if (rule.category === "calculation" && rule.functionBody) {
      //console.log("exeucteCalc: " + code);

      // Extract rules that this one depends upon
      // from functionBody tokens
      const regExPattern = /<<[\w\-]+?>>/gi;
      const tokens = rule.functionBody
        .match(regExPattern)
        .map(t => t.substr(2, t.length - 4));
      //console.log("tokens: " + JSON.stringify(tokens));
      let functionBody = rule.functionBody;

      // Modify functionBody to calculate tokens that
      // are not already calculated
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const tokenRule = this.rules[token];
        if (!tokenRule) {
          console.log("Token not found: " + token);
        }
        let code;
        if (
          tokenRule.category === "calculation" &&
          (tokenRule.value === null || tokenRule.value === "")
        ) {
          code = " this.executeCalc('" + token + "') ";
        } else {
          if (tokenRule.dataType === "string") {
            code = " '" + (tokenRule.value || "") + "' ";
          } else {
            code = " " + (tokenRule.value || 0) + " ";
          }
          tokenRule.used = true;
        }

        functionBody = functionBody.replace("<<" + token + ">>", code);
      }
      //console.log("functionBody: " + functionBody);
      try {
        rule.value = this.buildFunction(functionBody).call(this);
      } catch (error) {
        console.log("Failed to build function for " + rule.code + functionBody);
      }
    }
    console.log(code + " = " + rule.value);
    return rule.value;
  }

  // Parses functionBody to extract ruleDependencies
  // as a String array of ruleCodes.
  getDependencies(rule) {
    if (!rule || !rule.functionBody) {
      return [];
    }
    const regExPattern = /<<[A-Z_]+?>>/gi;
    return rule.functionBody
      .match(regExPattern)
      .map(t => t.substr(2, t.length - 4));
  }

  showWork(ruleCode) {
    console.log("Show work for " + ruleCode);
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

    for (var ruleCode in this.rules) {
      rulesArray.push(this.rules[ruleCode]);
    }
    return rulesArray;
  }
}

export default Engine;
