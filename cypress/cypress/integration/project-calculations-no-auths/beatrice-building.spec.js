//Reference : https://github.com/testing-library/cypress-testing-library
import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />
describe.skip("Beatrice Building", () => {
  it("verify calculation", () => {
    cy.visit("/calculation");
    // Dismiss Terms and Conditions dialog
    cy.findByText("Accept").click();

    // Should be on First Page
    cy.get("#PROJECT_NAME").type("Beatrice Building");
    cy.findByTestId("PROJECT_ADDRESS").type("12575 Beatrice St.");
    cy.findByTestId("APN").type("9999999999");
    cy.findByTestId("PROJECT_DESCRIPTION").type(
      "Sq Ft differs between spreadsheet and PDF supplied"
    );

    // Advance to specifications page
    cy.findByTestId("rightNavArrow").click();

    cy.findByTestId("SF_RETAIL").type("900");
    cy.findByTestId("SF_RESTAURANT").type("2500");
    cy.findByTestId("SF_OFFICE").type("283981");

    // Advance to Target Points Page
    // (Should skip Package Page, since Level 3)
    cy.findByTestId("rightNavArrow").click();

    cy.findByTestId("PARK_SPACES").type("845");
    cy.get("#PARK_REQUIREMENT").should("have.text", "597");
    cy.get("#CALC_PARK_RATIO").should("have.text", "141.54");

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
    cy.get("#STRATEGY_INFO_1").select("Internally visible");

    // Wayfinding
    cy.get("#STRATEGY_INFO_2").check();

    // Encouragement Program
    cy.get("#STRATEGY_INFO_3").select("Voluntary Behavior Change Program");

    // Parking Cash-Out
    cy.get("#STRATEGY_PARKING_2").check();

    // Transit Passes
    cy.get("#STRATEGY_TRANSIT_ACCESS_3").select("25%-49% of monthly fare");

    // Advance to Summary Page
    cy.findByTestId("rightNavArrow").click();

    cy.findByText("Beatrice Building").should("exist");
    cy.findByText("12575 Beatrice St.").should("exist");
    cy.findByText("Sq Ft differs between spreadsheet and PDF supplied").should(
      "exist"
    );

    cy.findAllByText("Retail, Employment / Office").should("exist");
    cy.findByTestId("summary-project-level-value").should("have.text", "3");
    cy.findByTestId("summary-parking-ratio-value").should("have.text", "141%");
    cy.findByTestId("summary-target-points-value").should("have.text", "33");
    cy.findByTestId("summary-earned-points-value").should("have.text", "33");
  });
});
