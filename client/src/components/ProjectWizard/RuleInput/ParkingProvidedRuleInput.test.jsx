import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ParkingProvidedRuleInput from "./ParkingProvidedRuleInput";
import Engine from "../../../services/tdm-engine";
import { tdmRules } from "../../../test-data/tdm-calc-rules";

const rule = {
  code: "PARK_SPACES",
  name: "Parking Provided",
  value: "12",
  units: "spaces",
  required: false,
  maxValue: 9999999,
  validationErrors: null
};

const setup = (overrides = {}) => {
  const onInputChange = jest.fn();
  const view = render(
    <ParkingProvidedRuleInput
      rule={{ ...rule, ...overrides }}
      onInputChange={onInputChange}
      resetProject={jest.fn()}
    />
  );
  return {
    ...view,
    onInputChange,
    input: screen.getByRole("textbox", { name: "Parking Provided" })
  };
};

afterEach(() => jest.useRealTimers());

it.each(["0", "111", "0012", "9999999", "10000000", ""])(
  "immediately forwards the accepted value %p without changing it",
  value => {
    const { input, onInputChange } = setup();

    fireEvent.change(input, { target: { value } });

    expect(input).toHaveValue(value);
    expect(onInputChange).toHaveBeenCalledTimes(1);
    expect(onInputChange).toHaveBeenCalledWith({
      target: { name: "PARK_SPACES", value }
    });
  }
);

it.each([
  "e",
  "E",
  "1e3",
  "1E+3",
  "1e-3",
  "abc",
  "12a",
  "-1",
  "+1",
  "1.5",
  "1 2",
  "1,000"
])(
  "rejects the whole invalid edit %p and exposes an accessible error",
  value => {
    const { input, onInputChange } = setup();
    fireEvent.change(input, { target: { value } });
    expect(input).toHaveValue("12");
    expect(screen.getByRole("alert")).toHaveTextContent("Use numbers only");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Use numbers only");
    expect(onInputChange).not.toHaveBeenCalled();
  }
);

it("rejects pasted exponent notation without converting it to different digits", async () => {
  const user = userEvent.setup();
  const { input, onInputChange } = setup();
  input.focus();
  input.select();
  await user.paste("1e3");
  expect(input).toHaveValue("12");
  expect(screen.getByRole("alert")).toHaveTextContent("Use numbers only");
  expect(onInputChange).not.toHaveBeenCalled();
});

it("allows editing shortcuts and clears the error on a valid edit", async () => {
  const user = userEvent.setup();
  const { input, onInputChange } = setup();
  await user.type(input, "e");
  expect(input).toHaveValue("12");
  await user.keyboard("{Control>}a{/Control}{Backspace}25");
  expect(input).toHaveValue("25");
  expect(input).toHaveAttribute("aria-invalid", "false");
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(onInputChange).toHaveBeenLastCalledWith({
    target: { name: "PARK_SPACES", value: "25" }
  });
});

it("Clear Page immediately sends an explicit empty value", () => {
  const { input, onInputChange } = setup();

  fireEvent.change(input, { target: { value: "45" } });
  fireEvent.change(input, { target: { value: "45e" } });
  fireEvent.click(screen.getByRole("button", { name: "Clear Page" }));

  expect(input).toHaveValue("");
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(onInputChange).toHaveBeenCalledTimes(2);
  expect(onInputChange).toHaveBeenNthCalledWith(1, {
    target: { name: "PARK_SPACES", value: "45" }
  });
  expect(onInputChange).toHaveBeenLastCalledWith({
    target: { name: "PARK_SPACES", value: "" }
  });
});

it("renders an existing numeric zero", () => {
  expect(setup({ value: 0 }).input).toHaveValue("0");
});

it("retains rule validation errors and associates them with the input", () => {
  const { input } = setup({ validationErrors: ["Parking exceeds maximum"] });
  fireEvent.blur(input);
  expect(input).toHaveAccessibleDescription("Parking exceeds maximum");
  fireEvent.change(input, { target: { value: "e" } });
  expect(input).toHaveAccessibleDescription("Use numbers only");
  fireEvent.change(input, { target: { value: "13" } });
  expect(input).toHaveAccessibleDescription("Parking exceeds maximum");
});

it("shows the real engine maximum error and clears it when corrected", () => {
  const parkingRule = tdmRules.find(rule => rule.code === "PARK_SPACES");
  const engine = new Engine([{ ...parkingRule, maxValue: 9999999 }]);
  engine.run({}, ["PARK_SPACES"]);

  const ParkingWithEngine = () => {
    const [currentRule, setCurrentRule] = React.useState(
      engine.showRulesArray()[0]
    );
    const onInputChange = ({ target }) => {
      engine.run({ [target.name]: target.value }, ["PARK_SPACES"]);
      setCurrentRule(engine.showRulesArray()[0]);
    };
    return (
      <ParkingProvidedRuleInput
        rule={currentRule}
        onInputChange={onInputChange}
        resetProject={jest.fn()}
      />
    );
  };

  render(<ParkingWithEngine />);
  const input = screen.getByRole("textbox", { name: "Parking Provided" });

  fireEvent.change(input, { target: { value: "9999999" } });
  expect(input).toHaveValue("9999999");
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();

  fireEvent.change(input, { target: { value: "10000000" } });
  expect(input).toHaveValue("10000000");
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Parking Provided must be no more than 9999999."
  );
  expect(input).toHaveAccessibleDescription(
    "Parking Provided must be no more than 9999999."
  );

  fireEvent.change(input, { target: { value: "9999999" } });
  expect(input).toHaveValue("9999999");
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(input).toHaveAttribute("aria-invalid", "false");
});

it("preserves an accepted edit when immediately unmounted", () => {
  jest.useFakeTimers();
  const { input, unmount, onInputChange } = setup();

  fireEvent.change(input, { target: { value: "45" } });
  unmount();

  expect(onInputChange).toHaveBeenCalledTimes(1);
  expect(onInputChange).toHaveBeenCalledWith({
    target: { name: "PARK_SPACES", value: "45" }
  });

  act(() => jest.advanceTimersByTime(750));

  expect(onInputChange).toHaveBeenCalledTimes(1);
});
