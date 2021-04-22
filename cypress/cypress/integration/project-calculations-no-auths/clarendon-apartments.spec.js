//Reference : https://github.com/testing-library/cypress-testing-library
import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />
describe("Clarendon Apartments", () => {
  it("verify calculation", () => {
    cy.visit("/calculation");
    // Dismiss Terms and Conditions dialog
    cy.findByText("Accept").click();

    cy.get("#PROJECT_NAME").type("Clarendon Apartments");
    cy.findByTestId("PROJECT_ADDRESS").type("22055 W. Clarendon St.");
    cy.findByTestId("APN").type("9999999999");
    cy.findByTestId("PROJECT_DESCRIPTION").type(
      "335-unit five-story apartment building"
    );

    // Advance to specifications page
    cy.findByTestId("rightNavArrow").click();

    cy.findByTestId("UNITS_HABIT_LT3").type("51");
    cy.findByTestId("UNITS_HABIT_3").type("134");
    cy.findByTestId("UNITS_HABIT_GT3").type("150");

    // Advance to Target Points Page
    // (Should skip Package Page, since Level 3)
    cy.findByTestId("rightNavArrow").click();

    cy.findByTestId("PARK_SPACES").type("564");
    cy.get("#PARK_REQUIREMENT").should("have.text", "552");
    cy.get("#CALC_PARK_RATIO").should("have.text", "102.17");

    // Advance to Strategies
    cy.findByTestId("rightNavArrow").click();

    // Affordable Housing
    cy.get("#STRATEGY_AFFORDABLE").select("35% of State Density Bonus");

    // Bike Parking should be pre-selected
    cy.get("#STRATEGY_BIKE_4").should("be.checked");

    // Car Share Parking
    cy.get("#STRATEGY_CAR_SHARE_1").select("Publicly Accessible");

    // Car Share Memberships
    cy.get("#STRATEGY_CAR_SHARE_2").check();

    // Encouragement Program
    cy.get("#STRATEGY_INFO_3").select("Education, Marketing & Outreach");

    // Pricing/unbundling
    cy.get("#STRATEGY_PARKING_1").select(
      "Each parking space is at least $220 a month"
    );

    // Advance to Summary Page
    cy.findByTestId("rightNavArrow").click();

    cy.findByText("Clarendon Apartments").should("exist");
    cy.findByText("22055 W. Clarendon St.").should("exist");
    cy.findByText("335-unit five-story apartment building").should("exist");

    cy.findAllByText("Residential").should("exist");
    cy.findByTestId("summary-project-level-value").should("have.text", "3");
    cy.findByTestId("summary-parking-ratio-value").should("have.text", "102%");
    cy.findByTestId("summary-target-points-value").should("have.text", "25");
    cy.findByTestId("summary-earned-points-value").should("have.text", "25");
  });
});
