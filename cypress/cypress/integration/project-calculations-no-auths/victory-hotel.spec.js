//Reference : https://github.com/testing-library/cypress-testing-library
import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />
describe.skip("Victory Hotel", () => {
  it("verify calculation", () => {
    cy.visit("/calculation");
    // Dismiss Terms and Conditions dialog
    cy.findByText("Accept").click();

    cy.get("#PROJECT_NAME").type("Victory Hotel");
    cy.findByTestId("PROJECT_ADDRESS").type("12425 Victory Bl.");
    cy.findByTestId("APN").type("9999999999");
    cy.findByTestId("PROJECT_DESCRIPTION").type("80-room four-story hotel");

    // Advance to specifications page
    cy.findByTestId("rightNavArrow").click();

    cy.findByTestId("UNITS_GUEST").type("80");

    // Advance to Target Points Page
    // (Should skip Package Page, since Level 3)
    cy.findByTestId("rightNavArrow").click();

    cy.findByTestId("PARK_SPACES").type("76");
    cy.get("#PARK_REQUIREMENT").should("have.text", "51");
    cy.get("#CALC_PARK_RATIO").should("have.text", "149.02");

    // Advance to Strategies
    cy.findByTestId("rightNavArrow").click();

    // Bike Parking should be pre-selected
    cy.get("#STRATEGY_BIKE_4").should("be.checked");

    // Changing / Shower / Locker
    cy.get("#STRATEGY_BIKE_5").select(
      "Publicly Accessible AND in a disadvantaged area"
    );

    // Car Share Parking
    cy.get("#STRATEGY_CAR_SHARE_1").select("Publicly Accessible");

    // HOV Parking
    cy.get("#STRATEGY_HOV_3").check();

    // Transit Displays
    cy.get("#STRATEGY_INFO_1").select("Publicly visible");

    // Wayfinding
    cy.get("#STRATEGY_INFO_2").check();

    // Encouragement Program
    cy.get("#STRATEGY_INFO_3").select("Education, Marketing & Outreach");

    cy.get("#STRATEGY_TRANSIT_ACCESS_3").select("25%-49% of monthly fare");

    // Go to Summary Page
    cy.findByTestId("rightNavArrow").click();

    cy.findByText("Victory Hotel").should("exist");
    cy.findByText("12425 Victory Bl.").should("exist");
    cy.findByText("80-room four-story hotel").should("exist");

    cy.findAllByText("Hotel / Motel").should("exist");
    cy.findByTestId("summary-project-level-value").should("have.text", "2");
    cy.findByTestId("summary-parking-ratio-value").should("have.text", "149%");
    cy.findByTestId("summary-target-points-value").should("have.text", "28");
    cy.findByTestId("summary-earned-points-value").should("have.text", "28");
  });
});
