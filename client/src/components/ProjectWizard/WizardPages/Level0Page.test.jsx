import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Level0Page from "./Level0Page";

describe("Level0Page", () => {
  it("displays information that the project level is 0", () => {
    render(<Level0Page isLevel0={true} />);
    expect(screen.getByText("Your project level is 0!")).toBeVisible();
  });

  //TODO: write another test that validates that the next button is disabled or not visible
});
