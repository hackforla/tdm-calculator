/// <reference types="cypress" />

const p = {
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

const projectInfo = {
  name: "Testing Everything!",
  address: "123 S. Somewhere Ave",
  ain: "9999999999",
  version: "1",
  buildingPermit: "54321",
  ladotCase: "67890",
  laPlanningCase: "09876",
  description: "description for this project",
};

const residentialSpecs = {
  habitableLessThan3: "5",
  habitable3: "10",
  habitableGreaterThan3: "15",
  condoUnits: "20",
  condoUnitsRequiredParking: "40",
  expectedPointsBefore: "20",
  expectedLevelBefore: "2",
  expectedPointsAfterAffordableHousing: "15",
  expectedLevelAfterAffordableHousing: "1",
};

describe.skip("Everything", () => {
  it("verify calculation", () => {
    cy.visit("/calculation");
    // Dismiss Terms and Conditions dialog
    cy.findByText("Accept").click();

    // Project Info
    cy.get("#PROJECT_NAME").type(projectInfo.name);
    cy.get("#PROJECT_ADDRESS").type(projectInfo.address);
    cy.get("#APN").type(projectInfo.ain);
    cy.get("#VERSION_NO").type(projectInfo.version);
    cy.get("#BUILDING_PERMIT").type(projectInfo.buildingPermit);
    cy.get("#CASE_NO_LADOT").type(projectInfo.ladotCase);
    cy.get("#CASE_NO_PLANNING").type(projectInfo.laPlanningCase);
    cy.get("#PROJECT_DESCRIPTION").type(projectInfo.description);
    cy.findByTestId("rightNavArrow").click();

    // Project Specifications
    // Residential
    cy.get("#UNITS_HABIT_LT3").type(residentialSpecs.habitableLessThan3);
    cy.get("#UNITS_HABIT_3").type(residentialSpecs.habitable3);
    cy.get("#UNITS_HABIT_GT3").type(residentialSpecs.habitableGreaterThan3);
    cy.get("#UNITS_CONDO").type(residentialSpecs.condoUnits);
    cy.get("#PARK_CONDO").type(residentialSpecs.condoUnitsRequiredParking);
    cy.get("#TARGET_POINTS_PARK").should("have.text", residentialSpecs.expectedPointsBefore);
    cy.get("#PROJECT_LEVEL").should("have.text", residentialSpecs.expectedLevelBefore);
    cy.get("#AFFORDABLE_HOUSING").check();
    cy.get("#TARGET_POINTS_PARK").should("have.text", residentialSpecs.expectedLevelPointsAffordableHousing);
    cy.get("#PROJECT_LEVEL").should("have.text", residentialSpecs.expectedLevelAfterAffordableHousing);
    // cy.findByTestId("rightNavArrow").click();

    // cy.findByTestId("PARK_SPACES").type(p.parkingProvided);
    // cy.get("#PARK_REQUIREMENT").should(
    //   "have.text",
    //   p.expectedParkingBaselineSpaces
    // );
    // cy.get("#CALC_PARK_RATIO").should(
    //   "have.text",
    //   p.expectedParkingBaselinePercentage
    // );

    // cy.findByTestId("rightNavArrow").click();
    // // Now we are on the Packge Info Page, since this is a level 1 project
    // // with residential land use

    // // Go to Strategies Page
    // cy.findByTestId("rightNavArrow").click();

    // // Bike Parking should be pre-selected
    // cy.get("#STRATEGY_BIKE_4").should("be.checked");
    // // Pricing/unbundling
    // cy.get("#STRATEGY_PARKING_1").select(p.pricingUnbundling);
    // // Reduced Parking Supply
    // cy.get("#STRATEGY_PARKING_5").select(p.reducedParkingSupply);
    // // Affordable Housing
    // cy.get("#STRATEGY_AFFORDABLE").select(p.affordableHousingLevel);

    // // Go to Summary Page
    // cy.findByTestId("rightNavArrow").click();

    // cy.findByText(p.projectName).should("be.visible");
    // cy.findByText(p.address).should("be.visible");

    // cy.findByTestId("summary-project-level-value").should(
    //   "have.text",
    //   p.expectedProjectLevelValue
    // );

    // cy.findByTestId("summary-parking-ratio-value").should(
    //   "have.text",
    //   p.expectedParkingRatioValue
    // );

    // cy.findByTestId("summary-target-points-value").should(
    //   "have.text",
    //   p.expectedTargetPointsValue
    // );

    // cy.findByTestId("summary-earned-points-value").should(
    //   "have.text",
    //   p.expectedEarnedPointsValue
    // );
  });
});
