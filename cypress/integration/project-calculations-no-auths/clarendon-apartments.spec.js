//Reference : https://github.com/testing-library/cypress-testing-library
import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />
describe("Clarendon Apartments", () => {
  describe("project inputs", () => {
    it("enters project information - minimum requirements", () => {
      cy.visit("http://localhost:3000/");
      cy.findAllByText("New Project").click();
      cy.findByLabelText("Project Name").type("Clarendon Apartments");
      cy.findByLabelText("Address").type("22055 W. Clarendon St.");
      cy.findByLabelText("Project Description").type(
        "335-unit five-story apartment building"
      );
      cy.findByTestId(">").click();
    });
    it("selects development type", () => {
      cy.findByLabelText("Residential").click();
      cy.findByTestId(">").click();
    });
    it("enters information for selected development type(s)", () => {
      cy.findByLabelText("# Habitable Rooms < 3").type("51");
      cy.findByLabelText("# Habitable Rooms = 3").type("134");
      cy.findByLabelText("# Habitable Rooms > 3").type("150");
      cy.findByTestId(">").click();
    });
    it("enters in number of parking spaces", () => {
      cy.findByLabelText("Parking Provided").type("564");
      cy.findByText("552 spcs").should("exist");
      cy.findByText("102.17 %").should("exist");
      cy.findByTestId(">").click();
    });
  });
  describe("project strategies", () => {
    it("selects transporation demand strategies and receive enough earned points", () => {
      cy.findByLabelText("Bike Parking").click();
      cy.findByLabelText("Car Share Parking").click();
      cy.findByLabelText("Car Share Memberships").click();
      cy.findByLabelText("Encouragement Program").select(
        "Education, Marketing & Outreach"
      );
      cy.findByLabelText("Pricing/Unbundling").click();
      cy.findByLabelText("Affordable Housing Level").select(
        "35% of State Density Bonus"
      );
      cy.findByTestId(">").click();
    });
  });
  describe("calculation summary", () => {
    it("shows the correct calculation summary", () => {
      cy.findByText("Clarendon Apartments").should("exist");
      cy.findByText("22055 W. Clarendon St.").should("exist");
      cy.findByText("335-unit five-story apartment building").should("exist");

      cy.findAllByText("Residential").should("exist");

      cy.findByTestId("summary-project-level-value").should("have.text", "3");
      cy.findByTestId("summary-project-level-label").should(
        "have.text",
        "Project Level"
      );

      cy.findByTestId("summary-parking-ratio-value").should(
        "have.text",
        "102 %"
      );
      cy.findByTestId("summary-parking-ratio-label").should(
        "have.text",
        "Provided / Required Parking"
      );

      cy.findByTestId("summary-target-points-value").should("have.text", "25");
      cy.findByTestId("summary-target-points-label").should(
        "have.text",
        "Target Points"
      );

      cy.findByTestId("summary-earned-points-value").should("have.text", "25");
      cy.findByTestId("summary-earned-points-label").should(
        "have.text",
        "Earned Points"
      );
    });
  });
});
