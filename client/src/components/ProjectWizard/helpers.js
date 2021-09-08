export const numberWithCommas = x => {
  return parseFloat(x).toLocaleString("en");
};

export const getCalculationPanelIds = rules =>
  rules.reduce((acc, rule) => {
    if (!acc.includes(rule.calculationPanelId)) {
      acc.push(rule.calculationPanelId);
    }
    return acc;
  }, []);

// Group rules into an array where each element is an array of rules for a particular panel
export const getPanelRules = (panelIds, rules) =>
  panelIds.map(panelId => {
    return rules.filter(rule => rule.calculationPanelId === panelId);
  });

export const getRule = (rules, code) => {
  const ruleList = rules.filter(rule => rule.code === code);
  if (ruleList && ruleList[0]) {
    return ruleList[0];
  }
  return null;
};
