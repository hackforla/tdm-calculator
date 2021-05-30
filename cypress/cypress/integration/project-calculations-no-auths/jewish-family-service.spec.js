//Reference : https://github.com/testing-library/cypress-testing-library
import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />
describe("Jewish Family Service", () => {
  it("enters project information - minimum requirements", () => {
    cy.visit("/calculation");
    // Dismiss Terms and Conditions dialog
    cy.findByText("Accept").click();

    cy.get("#PROJECT_NAME").type(
      "Jewish Family Service - Social Services Center"
    );
    cy.findByTestId("PROJECT_ADDRESS").type("320 N. Fairfax Av.");
    cy.findByTestId("APN").type("9999999999");
    cy.findByTestId("PROJECT_DESCRIPTION").type(
      "New 28,023 sf three-story building"
    );

    // Advance to specifications page
    cy.findByTestId("rightNavArrow").click();

    cy.findByTestId("SF_OFFICE").type("28341");

    // Advance to Target Points Page
    // (Should skip Package Page, since Level 3)
    cy.findByTestId("rightNavArrow").click();

    cy.findByTestId("PARK_SPACES").type("63");
    cy.get("#PARK_REQUIREMENT").should("have.text", "57");
    cy.get("#CALC_PARK_RATIO").should("have.text", "110.53");

    // Advance to Package Description Page
    // for Level 1 Project
    cy.findByTestId("rightNavArrow").click();

    cy.findByText("You qualify for a bonus package!").should("exist");

    // Advance to Strategies
    cy.findByTestId("rightNavArrow").click();

    // Bike Parking should be pre-selected
    cy.get("#STRATEGY_BIKE_4").should("be.checked");

    // Changing / Shower / Locker Facilities
    cy.get("#STRATEGY_BIKE_5").select("Private");

    // Car Share Parking
    cy.get("#STRATEGY_CAR_SHARE_1").select("Private");

    // HOV Parking
    cy.get("#STRATEGY_HOV_3").check();

    // Transit Displays
    cy.get("#STRATEGY_INFO_1").select("Publicly visible");

    // Wayfinding
    cy.get("#STRATEGY_INFO_2").check();

    // Encouragement Program
    cy.get("#STRATEGY_INFO_3").select("Education, Marketing & Outreach");

    // Advance to Summary Page
    cy.findByTestId("rightNavArrow").click();

    cy.findByText("Jewish Family Service - Social Services Center").should(
      "exist"
    );
    cy.findByText("320 N. Fairfax Av.").should("exist");
    cy.findByText("New 28,023 sf three-story building").should("exist");
    cy.findAllByText("Employment / Office").should("exist");
    cy.findByTestId("summary-project-level-value").should("have.text", "1");
    cy.findByTestId("summary-parking-ratio-value").should("have.text", "110%");
    cy.findByTestId("summary-target-points-value").should("have.text", "17");
    cy.findByTestId("summary-earned-points-value").should("have.text", "17");
  });
});
