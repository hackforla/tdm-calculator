/// <reference types="cypress" />

const projectInfo = {
  name: "Residental Flow",
  address: "123 S. Somewhere Ave",
  ain: "1234567890",
};

const specs = {
  habitableLessThan3: "10",
  habitable3: "10",
  habitableGreaterThan3: "10",
  condoUnits: "20",
  condoUnitsRequiredParking: "40",
  expectedLevelBefore: "2",
  expectedTargetPointsBefore: "20",
  expectedLevelAfterAffordableHousing: "1",
  expectedTargetPointsAfterAffordableHousing: "15",
};

const calculate = {
  parkingProvided: "115",
  expectedLevel: "1",
  expectedTargetPoints: "21",
  expectedCityParkingBaseline: "85",
  expectedParkingRatioBaseline: "135.29",
};

const bonusPackage = {
  expectedPageText: "You qualify for a bonus package!",
  expectedPackage: "Residential Package",
};

const strategies = {
  affordableHousingLevel: "20% of State Density Bonus",
  reducedParkingSupply: "Reduces 50%-74% of spaces available",
  expectedEarnedPoints: "21",
};

const summary = {
  expectedAIN: "1234-567-890",
  expectedLevel: calculate.expectedLevel,
  expectedTargetPoints: calculate.expectedTargetPoints,
  expectedEarnedPoints: strategies.expectedEarnedPoints,
  expectedParkingRatioBaseline: `${Math.floor(
    calculate.expectedParkingRatioBaseline
  )}`,
};

describe("Residential User Flow", () => {
  it("residential project info and specs", () => {
    cy.visit("/calculation");
    // Dismiss Terms and Conditions dialog
    cy.findByText("Accept").click();

    // Project Info
    cy.get("#PROJECT_NAME").type(projectInfo.name);
    cy.get("#PROJECT_ADDRESS").type(projectInfo.address);
    cy.get("#APN").type(projectInfo.ain);
    cy.findByTestId("rightNavArrow").click(); // Go to Page 2

    // Specifications Page - Residental
    cy.get("#UNITS_HABIT_LT3").type(specs.habitableLessThan3);
    cy.get("#UNITS_HABIT_3").type(specs.habitable3);
    cy.get("#UNITS_HABIT_GT3").type(specs.habitableGreaterThan3);
    cy.get("#UNITS_CONDO").type(specs.condoUnits);
    cy.get("#PARK_CONDO").type(specs.condoUnitsRequiredParking);

    // Specifications Page - Check points and level at this point
    cy.get("#PROJECT_LEVEL").should("have.text", specs.expectedLevelBefore);
    cy.get("#TARGET_POINTS_PARK").should(
      "have.text",
      specs.expectedTargetPointsBefore
    );

    // Specifications Page - Selecton Affordable Housing
    cy.get("#AFFORDABLE_HOUSING").check();

    // Specifications Page - Check points and level after clicking affordable housing
    cy.get("#TARGET_POINTS_PARK").should(
      "have.text",
      specs.expectedTargetPointsAfterAffordableHousing
    );
    cy.get("#PROJECT_LEVEL").should(
      "have.text",
      specs.expectedLevelAfterAffordableHousing
    );
    cy.findByTestId("rightNavArrow").click(); // Go to Page 3

    // Calculate TDM Target Points Page
    cy.get("#PARK_SPACES").type(calculate.parkingProvided);
    cy.get("#TARGET_POINTS_PARK").should(
      "have.text",
      calculate.expectedTargetPoints
    );
    cy.get("#PROJECT_LEVEL").should("have.text", calculate.expectedLevel);
    cy.get("#PARK_REQUIREMENT").should(
      "have.text",
      calculate.expectedCityParkingBaseline
    );
    cy.get("#CALC_PARK_RATIO").should(
      "have.text",
      calculate.expectedParkingRatioBaseline
    );
    cy.findByTestId("rightNavArrow").click(); // Go to Page 4

    // Bonus Package Info Page
    cy.get("#app-container").should("contain", bonusPackage.expectedPageText);
    cy.get("#app-container").should("contain", bonusPackage.expectedPackage);
    cy.findByTestId("rightNavArrow").click(); // Go to Page 5

    // Strategies Page
    cy.get("#packageResidential").check();
    cy.get("#STRATEGY_AFFORDABLE").select(strategies.affordableHousingLevel);
    cy.get("#STRATEGY_PARKING_5").select(strategies.reducedParkingSupply);
    cy.get("#PTS_EARNED").should("have.text", strategies.expectedEarnedPoints);
    cy.findByTestId("rightNavArrow").click(); // Go to Summary Page

    // Summary Page
    cy.findByText(projectInfo.name).should("be.visible");
    cy.findByText(projectInfo.address).should("be.visible");
    cy.findByText("1234-567-890").should("be.visible");

    cy.findByTestId("summary-project-level-value").should(
      "have.text",
      summary.expectedLevel
    );

    cy.findByTestId("summary-parking-ratio-value").should(
      "have.text",
      summary.expectedParkingRatioBaseline
    );

    cy.findByTestId("summary-target-points-value").should(
      "have.text",
      summary.expectedTargetPoints
    );

    cy.findByTestId("summary-earned-points-value").should(
      "have.text",
      summary.expectedEarnedPoints
    );
  });
});
