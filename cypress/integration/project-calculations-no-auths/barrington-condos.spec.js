//Reference : https://github.com/testing-library/cypress-testing-library
import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />
describe("Barrington Condos", () => {
  describe("project inputs", () => {
    it("should enter project information - minimum requirements", () => {
      cy.visit("http://localhost:3000/");
      cy.findAllByText("New Project").click();
      cy.findByLabelText("Project Name").type("Barrington Condos");
      cy.findByLabelText("Address").type("825 S. Barrington Ave");
      cy.findByTestId(">").click();
    });
    it("should select development type", () => {
      cy.findByLabelText("Residential").click();
      cy.findByTestId(">").click();
    });
    it("should enter information for selected development type(s)", () => {
      cy.findByLabelText("Condo - Units").type("46");
      cy.findByLabelText("Condo - Enter Parking Space Req'd").type("92");
      cy.findByTestId(">").click();
    });
    it("should enter in number of parking spaces", () => {
      cy.findByLabelText("Parking Provided").type("88");
      cy.findByText("92 spcs").should("exist");
      cy.findByText("95.65 %").should("exist");
      cy.findByTestId(">").click();
    });
  });
  describe("project strategies", () => {
    it("should select transporation demand strategies and receive enough earned points", () => {
      cy.findByLabelText("Bike Parking").click();
      cy.findByLabelText("Pricing/Unbundling").click();
      cy.findByLabelText("Reduced Parking Supply").click();
      cy.findByLabelText("Affordable Housing Level").select(
        "35% of State Density Bonus"
      );
      cy.findByTestId(">").click();
    });
  });
  describe("calculation summary", () => {
    it("should show the correct calculation summary", () => {
      cy.findByText("Barrington Condos").should("exist");
      cy.findByText("825 S. Barrington Ave").should("exist");

      cy.findAllByText("Residential").should("exist");

      cy.findByTestId("summary-project-level-value").should("have.text", "1");
      cy.findByTestId("summary-project-level-label").should(
        "have.text",
        "Project Level"
      );

      cy.findByTestId("summary-parking-ratio-value").should(
        "have.text",
        "95 %"
      );
      cy.findByTestId("summary-parking-ratio-label").should(
        "have.text",
        "Provided / Required Parking"
      );

      cy.findByTestId("summary-target-points-value").should("have.text", "15");
      cy.findByTestId("summary-target-points-label").should(
        "have.text",
        "Target Points"
      );

      cy.findByTestId("summary-earned-points-value").should("have.text", "16");
      cy.findByTestId("summary-earned-points-label").should(
        "have.text",
        "Earned Points"
      );
    });
  });
});
