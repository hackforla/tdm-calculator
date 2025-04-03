import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Level0Page from "./Level0Page";
import { ThemeProvider } from "react-jss";
import { jssTheme } from "../../../styles/theme";

describe("Level0Page", () => {
  it("displays information that the project level is 0", () => {
    render( 
      <ThemeProvider theme={jssTheme}>
        <Level0Page resetProject={() => {}} isLevel0={true} />
      </ThemeProvider>);
    expect(screen.getByText("Your project level is 0")).toBeVisible();
  });

  //TODO: write another test that validates that the next button is disabled or not visible
});
