import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";

describe("Footer", () => {
  it("opens Glossary in a fresh tab with an external-link icon", () => {
    render(
      <MemoryRouter>
        <Footer toggleChecklistModal={() => {}} />
      </MemoryRouter>
    );

    const glossaryLink = screen.getByRole("link", { name: /Glossary/i });
    expect(glossaryLink).toHaveAttribute("target", "_blank");
    expect(glossaryLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(glossaryLink.querySelector("svg")).toBeTruthy();
  });

  it("keeps Terms and Privacy as internal routes", () => {
    render(
      <MemoryRouter>
        <Footer toggleChecklistModal={() => {}} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: /Terms and Conditions/i })
    ).toHaveAttribute("href", "/termsandconditions");
    expect(
      screen.getByRole("link", { name: /Privacy Policy/i })
    ).toHaveAttribute("href", "/privacypolicy");
  });
});
