//Reference : https://github.com/testing-library/cypress-testing-library
import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />
describe.skip("Marina Towers Village", () => {
  it("verify calculation", () => {
    cy.visit("/calculation");
    // Dismiss Terms and Conditions dialog
    cy.findByText("Accept").click();

    // Should be on First Page
    cy.get("#PROJECT_NAME").type("Marina Towers Village");
    cy.findByTestId("PROJECT_ADDRESS").type("13428 Maxella Ave");
    cy.findByTestId("APN").type("9999999999");
    cy.findByTestId("PROJECT_DESCRIPTION").type(
      "A mixed use development scheduled for 2025"
    );

    // Advance to specifications page
    cy.findByTestId("rightNavArrow").click();

    cy.findByTestId("UNITS_HABIT_LT3").type("140");
    cy.findByTestId("SF_RESTAURANT").type("30000");
    cy.findByTestId("SF_OFFICE").type("100000");

    // Advance to Target Points Page
    // (Should skip Package Page, since Level 3)
    cy.findByTestId("rightNavArrow").click();

    cy.findByTestId("PARK_SPACES").type("1000");
    cy.get("#PARK_REQUIREMENT").should("have.text", "640");
    cy.get("#CALC_PARK_RATIO").should("have.text", "156.25");

    // Advance to Strategies
    cy.findByTestId("rightNavArrow").click();

    // Bike Share Station
    cy.get("#STRATEGY_BIKE_2").check();

    // Bike Share Membership - Gold
    cy.get("#STRATEGY_BIKE_3").select("Gold");

    // Bike Parking should be pre-selected
    cy.get("#STRATEGY_BIKE_4").should("be.checked");

    // Encouragement Program
    cy.get("#STRATEGY_INFO_3").select("Education, Marketing & Outreach");

    // Parking Cash-Out
    cy.get("#STRATEGY_PARKING_2").check();

    // Pricing/unbundling
    cy.get("#STRATEGY_PARKING_1").select(
      "Each parking space is at least $220 a month"
    );

    // Join TMO
    cy.get("#STRATEGY_TMO_1").check();

    // Advance to Summary Page
    cy.findByTestId("rightNavArrow").click();

    cy.findByText("Marina Towers Village").should("exist");
    cy.findByText("13428 Maxella Ave").should("exist");
    cy.findByText("A mixed use development scheduled for 2025").should("exist");

    cy.findAllByText("Residential, Retail, Employment / Office").should(
      "exist"
    );

    cy.findByTestId("summary-project-level-value").should("have.text", "3");
    cy.findByTestId("summary-parking-ratio-value").should("have.text", "156%");
    cy.findByTestId("summary-target-points-value").should("have.text", "35");
    cy.findByTestId("summary-earned-points-value").should("have.text", "35");
  });
});
