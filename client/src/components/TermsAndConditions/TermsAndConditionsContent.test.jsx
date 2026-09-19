import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "react-jss";
import { jssTheme } from "../../styles/theme";
import TermsAndConditionsContent from "./TermsAndConditionsContent";

describe("TermsAndConditionsContent", () => {
  it("marks the mobility web link as external and leaves mailto without an icon", () => {
    render(
      <ThemeProvider theme={jssTheme}>
        <TermsAndConditionsContent />
      </ThemeProvider>
    );

    const mobilityLink = screen.getByRole("link", {
      name: /planning4la\.org\/mobility/i
    });
    expect(mobilityLink).toHaveAttribute("target", "_blank");
    expect(mobilityLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(mobilityLink.querySelector("svg")).toBeTruthy();

    const emailLink = screen.getByRole("link", {
      name: /ladot\.tdm@lacity\.org/i
    });
    expect(emailLink).toHaveAttribute("href", "mailto:ladot.tdm@lacity.org");
    expect(emailLink).not.toHaveAttribute("target");
    expect(emailLink.querySelector("svg")).toBeNull();
  });
});
