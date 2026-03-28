import { useContext } from "react";
import Engine from "../services/tdm-engine";
import ConfigContext from "../contexts/ConfigContext";
import CalculationsContext from "../contexts/CalculationsContext";

// The calculate function performs the calculation for a given project.
// This is a custom hook, to allow the function to access the contexts,
// which cache the config and calculation in contexts.

const useCalculator = () => {
  const configContext = useContext(ConfigContext);
  const defaultCalculationId = Number(configContext.CURRENT_CALCULATION_ID);
  const calculations = useContext(CalculationsContext);

  const calculate = async project => {
    // If the project.isCalculationIdOverride is true, the project is locked to the
    // specific calculationId from the project record. Otherwise, it should use
    // the current default calculationId from config.
    const calculationId =
      project.isCalculationIdOverride || project.dateSubmitted
        ? project.calculationId
        : defaultCalculationId;

    const calculation = calculations[calculationId];
    const engine = new Engine(calculation.rules);

    const inputs = project.formInputs;
    const data = JSON.parse(inputs);

    engine.run(data, resultRuleCodes);
    const rules = engine.showRulesArray();
    return rules;
  };

  return [calculate];
};

// These are the calculation results we want to calculate
// and display on the main page.
// TODO: share these constants with the real thing in TdmCalculationContainer?
const resultRuleCodes = [
  "PROJECT_LEVEL",
  "CALC_PARK_RATIO",
  "TARGET_POINTS_PARK",
  "PTS_EARNED"
];

export default useCalculator;
