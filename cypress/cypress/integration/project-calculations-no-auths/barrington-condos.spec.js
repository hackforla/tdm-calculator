/// <reference types="cypress" />

const p = {
  projectName: "Barrington Condos",
  address: "825 S. Barrington Ave",
  ain: "9999999999",
  condoUnits: "46",
  requiredParkingSpaces: "92",
  parkingProvided: "88",
  expectedParkingBaselineSpaces: "92",
  expectedParkingBaselinePercentage: "95.65",
  pricingUnbundling: "Each parking space is at least $220 a month",
  reducedParkingSupply: "Reduces 50%-74% of spaces available",
  affordableHousingLevel: "20% of State Density Bonus",
  expectedProjectLevelValue: "1",
  expectedParkingRatioValue: "95%",
  expectedTargetPointsValue: "15",
  expectedEarnedPointsValue: "16",
};

describe("Barrington Condos", () => {
  it("verify calculation", () => {
    cy.visit("/calculation");
    // Dismiss Terms and Conditions dialog
    cy.findByText("Accept").click();

    cy.get("#PROJECT_NAME").type(p.projectName);
    cy.findByTestId("PROJECT_ADDRESS").type(p.address);
    cy.findByTestId("APN").type(p.ain);
    cy.findByTestId("rightNavArrow").click();

    cy.findByTestId("UNITS_CONDO").type(p.condoUnits);
    cy.findByTestId("PARK_CONDO").type(p.requiredParkingSpaces);
    cy.findByTestId("rightNavArrow").click();

    cy.findByTestId("PARK_SPACES").type(p.parkingProvided);
    cy.get("#PARK_REQUIREMENT").should(
      "have.text",
      p.expectedParkingBaselineSpaces
    );
    cy.get("#CALC_PARK_RATIO").should(
      "have.text",
      p.expectedParkingBaselinePercentage
    );

    cy.findByTestId("rightNavArrow").click();
    // Now we are on the Packge Info Page, since this is a level 1 project
    // with residential land use

    // Go to Strategies Page
    cy.findByTestId("rightNavArrow").click();

    // Bike Parking should be pre-selected
    cy.get("#STRATEGY_BIKE_4").should("be.checked");
    // Pricing/unbundling
    cy.get("#STRATEGY_PARKING_1").select(p.pricingUnbundling);
    // Reduced Parking Supply
    cy.get("#STRATEGY_PARKING_5").select(p.reducedParkingSupply);
    // Affordable Housing
    cy.get("#STRATEGY_AFFORDABLE").select(p.affordableHousingLevel);

    // Go to Summary Page
    cy.findByTestId("rightNavArrow").click();

    cy.findByText(p.projectName).should("be.visible");
    cy.findByText(p.address).should("be.visible");

    cy.findByTestId("summary-project-level-value").should(
      "have.text",
      p.expectedProjectLevelValue
    );

    cy.findByTestId("summary-parking-ratio-value").should(
      "have.text",
      p.expectedParkingRatioValue
    );

    cy.findByTestId("summary-target-points-value").should(
      "have.text",
      p.expectedTargetPointsValue
    );

    cy.findByTestId("summary-earned-points-value").should(
      "have.text",
      p.expectedEarnedPointsValue
    );
  });
});
