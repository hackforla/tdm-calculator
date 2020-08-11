//Reference : https://github.com/testing-library/cypress-testing-library
import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />
describe("Barrington Condos", () => {
  context("project inputs", () => {
    it("enters project information - minimum requirements", () => {
      cy.visit("/");
      cy.get(":nth-child(1) > .form-control").type(
        "test_regular_user@dispostable.com"
      );
      cy.get(":nth-child(2) > .form-control").type("Dogfood1");
      cy.get(".btn-submit").click();
      cy.findByLabelText("Project Name").type("Barrington Condos");
      cy.findByLabelText("Address").type("825 S. Barrington Ave");
      cy.get("[data-testid=APN]").type("1234567890");
      cy.get(".space-between").click();
      cy.get("#UNITS_CONDO").type("46");
      cy.get("#PARK_CONDO").type("92");
      cy.get(".space-between > :nth-child(2)").click();
      cy.get("#PARK_SPACES").type("88");
      cy.get(".space-between > :nth-child(2)").click();
      cy.findByLabelText("Bike Parking").click();
      cy.get("#STRATEGY_PARKING_1").select(
        "the cost of each parking space is $25/mo"
      );
      cy.findByLabelText("Reduced Parking Supply").select(
        "Reduces 25% of the parking spaces available relative to the  parking baseline"
      );
      cy.findByLabelText("Affordable Housing Level").select(
        "35% of State Density Bonus"
      );
    });
  });

  // describe("calculation summary", () => {
  //   it("shows the correct calculation summary", () => {
  //     cy.findByText("Barrington Condos").should("exist");
  //     cy.findByText("825 S. Barrington Ave").should("exist");
  //
  //     cy.findAllByText("Residential").should("exist");
  //
  //     cy.findByTestId("summary-project-level-value").should("have.text", "1");
  //     cy.findByTestId("summary-project-level-label").should(
  //       "have.text",
  //       "Project Level"
  //     );
  //
  //     cy.findByTestId("summary-parking-ratio-value").should(
  //       "have.text",
  //       "95 %"
  //     );
  //     cy.findByTestId("summary-parking-ratio-label").should(
  //       "have.text",
  //       "Parking Provided / Baseline"
  //     );
  //
  //     cy.findByTestId("summary-target-points-value").should("have.text", "15");
  //     cy.findByTestId("summary-target-points-label").should(
  //       "have.text",
  //       "Target Points"
  //     );
  //
  //     cy.findByTestId("summary-earned-points-value").should("have.text", "16");
  //     cy.findByTestId("summary-earned-points-label").should(
  //       "have.text",
  //       "Earned Points"
  //     );
  //   });
  // });
});
