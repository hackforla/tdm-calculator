//Reference : https://github.com/testing-library/cypress-testing-library
import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />
describe("Fountain Apartments", () => {
  it("verify calculation", () => {
    cy.visit("/calculation");
    // Dismiss Terms and Conditions dialog
    cy.findByText("Accept").click();

    cy.findByTestId("PROJECT_NAME").type("Fountain Apartments");
    cy.findByTestId("PROJECT_ADDRESS").type("5460 W. Fountain Av.");
    cy.findByTestId("APN").type("9999999999");
    cy.findByTestId("PROJECT_DESCRIPTION").type(
      "A 75-unit six-story apartment building"
    );

    // Advance to specifications page
    cy.findByTestId("rightNavArrow").click();

    cy.findByTestId("UNITS_HABIT_LT3").type("37");
    cy.findByTestId("UNITS_HABIT_3").type("36");
    cy.findByTestId("UNITS_HABIT_GT3").type("2");

    // Advance to Strategies Target Points Page
    // (Should skip Package Page, since Level 3)
    cy.findByTestId("rightNavArrow").click();

    cy.findByTestId("PARK_SPACES").type("108");
    cy.get("#PARK_REQUIREMENT").should("have.text", "95");
    cy.get("#CALC_PARK_RATIO").should("have.text", "113.68");

    // Advance to Strategies
    cy.findByTestId("rightNavArrow").click();

    // Affordable Housing
    cy.get("#STRATEGY_AFFORDABLE").select("35% of State Density Bonus");

    // Bike Parking should be pre-selected
    cy.get("#STRATEGY_BIKE_4").should("be.checked");

    // Car Share Parking
    cy.get("#STRATEGY_CAR_SHARE_1").check();

    // Wayfinding
    cy.get("#STRATEGY_INFO_2").check();

    // Encouragement Program
    cy.get("#STRATEGY_INFO_3").select("Education, Marketing & Outreach");

    // Pricing/unbundling
    cy.get("#STRATEGY_PARKING_1").select(
      "Each parking space is at least $220 a month"
    );

    cy.get("#STRATEGY_SHARED_MOBILITY_1").check();
    // ---------

    // cy.findByLabelText("Bike Parking").click();
    // cy.findByLabelText("Car Share Parking").click();
    // cy.findByLabelText("Wayfinding").click();
    // cy.findByLabelText("Encouragement Program").select(
    //   "Education, Marketing & Outreach"
    // );
    // cy.findByLabelText("Pricing/Unbundling").click();
    // cy.findByLabelText("Existing Provider").click();
    // cy.findByLabelText("Affordable Housing Level").select(
    //   "35% of State Density Bonus"
    // );

    // Advance to Summary Page
    cy.findByTestId("rightNavArrow").click();

    cy.findByText("Fountain Apartments").should("exist");
    cy.findByText("5460 W. Fountain Av.").should("exist");
    cy.findByText("A 75-unit six-story apartment building").should("exist");

    cy.findAllByText("Residential").should("exist");
    cy.findByTestId("summary-project-level-value").should("have.text", "2");
    cy.findByTestId("summary-parking-ratio-value").should("have.text", "113%");
    cy.findByTestId("summary-target-points-value").should("have.text", "22");
    cy.findByTestId("summary-earned-points-value").should("have.text", "21");
  });
});
