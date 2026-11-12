import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TdmCalculationContainer from "./TdmCalculationContainer";
import Engine from "../../services/tdm-engine";
import ConfigContext from "../../contexts/ConfigContext";
import CalculationsContext from "../../contexts/CalculationsContext";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: "/calculation/3/0" })
}));
jest.mock("../../hooks/useProject", () => {
  const getProjectById = jest.fn();
  return { __esModule: true, default: () => ({ getProjectById }) };
});
jest.mock("../../services/project.service", () => ({}));
jest.mock("../../contexts/Toast", () => ({
  useToast: () => ({ add: jest.fn() })
}));
jest.mock("../../services/tdm-engine", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    run: jest.fn().mockReturnValue(false),
    showRulesArray: () => [
      { code: "PARK_REQUIREMENT", value: 100 },
      {
        code: "PARK_SPACES",
        name: "Parking Provided",
        required: false,
        value: "12"
      }
    ]
  }))
}));
jest.mock("./TdmCalculationWizard", () => {
  const ParkingInput = require("./RuleInput/ParkingProvidedRuleInput").default;
  return {
    __esModule: true,
    default: ({ rules, onParkingProvidedChange, onResetProject }) => {
      const rule = rules.find(r => r.code === "PARK_SPACES");
      return rule ? (
        <ParkingInput
          rule={rule}
          onInputChange={onParkingProvidedChange}
          resetProject={onResetProject}
        />
      ) : null;
    }
  };
});

const setup = () => {
  render(
    <ConfigContext.Provider value={{ CURRENT_CALCULATION_ID: "1" }}>
      <CalculationsContext.Provider value={{ 1: { rules: [] } }}>
        <TdmCalculationContainer />
      </CalculationsContext.Provider>
    </ConfigContext.Provider>
  );
  return {
    input: screen.getByRole("textbox", { name: "Parking Provided" }),
    engine: Engine.mock.results[Engine.mock.results.length - 1].value
  };
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers();
});
afterEach(() => jest.useRealTimers());

it.each([
  ["0", 4],
  ["10", 4],
  ["11", 3],
  ["50", 3],
  ["51", 2],
  ["75", 2],
  ["76", 1],
  ["90", 1],
  ["91", 0],
  ["111", 0],
  ["", 0]
])("preserves the parking calculation for %p spaces", (value, index) => {
  const { input, engine } = setup();
  fireEvent.change(input, { target: { value } });
  act(() => jest.advanceTimersByTime(750));
  expect(engine.run).toHaveBeenLastCalledWith(
    { PARK_SPACES: value, STRATEGY_PARKING_5: index },
    ["PROJECT_LEVEL", "CALC_PARK_RATIO", "TARGET_POINTS_PARK", "PTS_EARNED"]
  );
});

it("does not recalculate or replace the last valid value after an exponent edit", () => {
  const { input, engine } = setup();
  fireEvent.change(input, { target: { value: "50" } });
  act(() => jest.advanceTimersByTime(750));
  const calls = engine.run.mock.calls.length;
  fireEvent.change(input, { target: { value: "1e3" } });
  act(() => jest.advanceTimersByTime(750));
  expect(input).toHaveValue("50");
  expect(engine.run).toHaveBeenCalledTimes(calls);
});

it("Clear Page recalculates with an empty value and resets the reduction index", () => {
  const { input, engine } = setup();
  fireEvent.change(input, { target: { value: "50" } });
  act(() => jest.advanceTimersByTime(750));
  fireEvent.click(screen.getByRole("button", { name: "Clear Page" }));
  act(() => jest.advanceTimersByTime(750));
  expect(engine.run).toHaveBeenLastCalledWith(
    { PARK_SPACES: "", STRATEGY_PARKING_5: 0 },
    expect.any(Array)
  );
});
