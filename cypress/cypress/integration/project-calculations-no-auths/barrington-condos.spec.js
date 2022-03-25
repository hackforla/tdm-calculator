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
  expectedParkingRatioValue: "95",
  expectedTargetPointsValue: "15",
  expectedEarnedPointsValue: "16",
};

describe("Barrington Condos", () => {
  beforeEach(() => {
    window.localStorage.setItem("termsAndConditions", "Accepted");
  });

  it("fills out project info (page 1)", () => {
    cy.goToStart();

    cy.get("#PROJECT_NAME").type(p.projectName);
    cy.findByTestId("PROJECT_ADDRESS").type(p.address);
    cy.get("#APN").type(p.ain).type("\t");
    cy.goToNextPage();
  });

  it("fills out project specifications and validates points (page 2)", () => {
    cy.findByTestId("UNITS_CONDO").type(p.condoUnits);
    cy.findByTestId("PARK_CONDO").type(p.requiredParkingSpaces);
    cy.goToNextPage();
  });

  it("fills out parking spaces provided and validates points (page 3)", () => {
    cy.findByTestId("PARK_SPACES").type(p.parkingProvided);
    cy.get("#PARK_REQUIREMENT").should("have.text", p.expectedParkingBaselineSpaces);
    cy.get("#CALC_PARK_RATIO").should("have.text", p.expectedParkingBaselinePercentage);
    cy.goToNextPage();
  });

  it("displays bonus package (page 4)", () => {
    cy.findByText("You qualify for a bonus package!");
    cy.findByText("Residential or Employment Package");
    cy.goToNextPage();
  });

  it("fills out strategies page and validates points (page 5)", () => {
    cy.get("#STRATEGY_BIKE_4").should("be.checked"); // Bike Parking should be pre-selected
    cy.get("#STRATEGY_PARKING_1").select(p.pricingUnbundling); // Pricing/unbundling
    cy.get("#STRATEGY_PARKING_5").select(p.reducedParkingSupply); // Reduced Parking Supply
    cy.get("#STRATEGY_AFFORDABLE").select(p.affordableHousingLevel); // Affordable Housing
    cy.goToNextPage();
  });

  it("validates summary page (page 6)", () => {
    cy.findByText(p.projectName).should("be.visible");
    cy.findByText(p.address).should("be.visible");

    cy.findByTestId("summary-project-level-value").should("have.text", p.expectedProjectLevelValue);
    cy.findByTestId("summary-parking-ratio-value").should("have.text", p.expectedParkingRatioValue);
    cy.findByTestId("summary-target-points-value").should("have.text", p.expectedTargetPointsValue);
    cy.findByTestId("summary-earned-points-value").should("have.text", p.expectedEarnedPointsValue);
  });
});
