import React, { useState } from "react";
import PropTypes from "prop-types";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TableSearchField from "../TableSearchField";

const ControlledField = ({ onSearch, ...props }) => {
  const [value, setValue] = useState("");
  return (
    <TableSearchField
      id="searchString"
      label="Search accounts"
      placeholder="Search by Email or Name"
      value={value}
      onChange={e => {
        setValue(e.target.value);
        onSearch(e.target.value);
      }}
      width="20rem"
      {...props}
    />
  );
};

ControlledField.propTypes = {
  onSearch: PropTypes.func.isRequired
};

describe("TableSearchField", () => {
  it("renders one search input named by its hidden label", () => {
    render(<ControlledField onSearch={jest.fn()} />);

    const input = screen.getByRole("searchbox", { name: "Search accounts" });
    expect(input).toHaveAttribute("type", "search");
    expect(input).toHaveAttribute("id", "searchString");
    expect(input).toHaveAttribute("name", "searchString");
    expect(input).toHaveAttribute("placeholder", "Search by Email or Name");
    expect(input).not.toHaveAttribute("aria-label");
    expect(screen.getByText("Search accounts")).toHaveClass("sr-only");
    expect(screen.getAllByRole("searchbox")).toHaveLength(1);
  });

  it("hides the decorative search icon from assistive technology", () => {
    const { container } = render(<ControlledField onSearch={jest.fn()} />);

    const icons = container.querySelectorAll("svg");
    expect(icons).toHaveLength(1);
    expect(icons[0]).toHaveAttribute("aria-hidden", "true");
    expect(icons[0]).toHaveAttribute("focusable", "false");
  });

  it("passes each change event to the page handler and stays controlled", async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn();
    render(<ControlledField onSearch={onSearch} />);

    const input = screen.getByRole("searchbox", { name: "Search accounts" });
    await user.type(input, "Ann");
    expect(input).toHaveValue("Ann");
    expect(onSearch).toHaveBeenLastCalledWith("Ann");

    await user.clear(input);
    expect(input).toHaveValue("");
    expect(onSearch).toHaveBeenLastCalledWith("");
  });

  it("puts an optional test id on the input", () => {
    render(<ControlledField onSearch={jest.fn()} dataTestId="searchString" />);

    expect(screen.getByTestId("searchString")).toBe(
      screen.getByRole("searchbox", { name: "Search accounts" })
    );
  });

  it("adds the page layout class to the wrapper", () => {
    render(<ControlledField onSearch={jest.fn()} className="pageLayout" />);

    const input = screen.getByRole("searchbox", { name: "Search accounts" });
    expect(input.parentElement).toHaveClass("pageLayout");
  });
});
