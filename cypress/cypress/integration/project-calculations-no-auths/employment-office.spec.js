/// <reference types="cypress" />

const projectInfo = {
  name: "Employment/Office Flow",
  address: "123 S. Somewhere Ave",
  ain: "9999999999",
};

const specs = {
  officeBusinessManufacturingIndustrialSqFt: "10000",
  otherInstitutionalSqFt: "20000",
  govtInstitutionSqFt: "30000",
  expectedTargetPoints: "20",
  expectedLevel: "2",
};

const calculate = {
  parkingProvided: "150",
  expectedLevel: "2",
  expectedTargetPoints: "24",
  expectedCityParkingBaseline: "120",
  expectedParkingRatioBaseline: "125",
};

const strategies = {
  expectedEarnedPoints: "27",
};

const summary = {
  expectedAIN: "9999-999-999",
  expectedLevel: calculate.expectedLevel,
  expectedTargetPoints: calculate.expectedTargetPoints,
  expectedEarnedPoints: strategies.expectedEarnedPoints,
  expectedParkingRatioBaseline: `${Math.floor(calculate.expectedParkingRatioBaseline)}`,
};

describe("Employment/Office Flow", () => {
  beforeEach(() => {
    window.localStorage.setItem("termsAndConditions", "Accepted");
  });

  it("fills out project info (page 1)", () => {
    cy.goToStart();

    cy.get("#PROJECT_NAME").type(projectInfo.name);
    cy.get("#PROJECT_ADDRESS").type(projectInfo.address);
    cy.get("#APN").type(projectInfo.ain);
    cy.goToNextPage();
  });

  it("fills out project specifications and validates points (page 2)", () => {
    cy.get("#SF_OFFICE").type(specs.officeBusinessManufacturingIndustrialSqFt);
    cy.get("#SF_INST_OTHER").type(specs.otherInstitutionalSqFt);
    cy.get("#SF_INST_GOV").type(specs.govtInstitutionSqFt);

    cy.get("#TARGET_POINTS_PARK").should("have.text", specs.expectedTargetPoints);
    cy.get("#PROJECT_LEVEL").should("have.text", specs.expectedLevel);
    cy.goToNextPage();
  });

  it("fills out parking spaces provided and validates points (page 3)", () => {
    cy.get("#PARK_SPACES").type(calculate.parkingProvided);
    cy.get("#TARGET_POINTS_PARK").should("have.text", calculate.expectedTargetPoints);
    cy.get("#PROJECT_LEVEL").should("have.text", calculate.expectedLevel);
    cy.get("#PARK_REQUIREMENT").should("have.text", calculate.expectedCityParkingBaseline);
    cy.get("#CALC_PARK_RATIO").should("have.text", calculate.expectedParkingRatioBaseline);
    cy.goToNextPage();
  });

  it("fills out strategies page, and validates points and disabled fields (page 5)", () => {
    // Check defaults and initial state
    cy.get("#STRATEGY_AFFORDABLE").should("be.disabled"); // Affordable Housing
    cy.get("#STRATEGY_BIKE_4").should("be.checked"); // Bike Parking (required)
    cy.get("#STRATEGY_INFO_5").should("be.disabled"); // School Safety Campaign
    cy.get("#PTS_EARNED").should("have.text", "2");

    // Bicycle Facilities
    cy.get("#STRATEGY_BIKE_3").select("Gold"); // Bike Memberships
    cy.get("#STRATEGY_BIKE_5").select("Publicly Accessible AND in a disadvantaged area"); // Changing/Shower/Locker Facilities
    cy.get("#PTS_EARNED").should("have.text", "13");

    // Mobility Investment
    cy.get("#STRATEGY_MOBILITY_INVESTMENT_1").select("50-74% of 1/4 mi walkshed"); // Access Improvement
    cy.get("#STRATEGY_MOBILITY_INVESTMENT_2").select("$200,000-$499,999"); // Mobility Management
    cy.get("#PTS_EARNED").should("have.text", "23");

    // Parking
    cy.get("#STRATEGY_PARKING_1").select("Each parking space is at least $110 a month"); // Pricing/Unbundling
    cy.get("#PTS_EARNED").should("have.text", strategies.expectedEarnedPoints);

    cy.goToNextPage();
  });

  it("validates summary page (page 6)", () => {
    cy.findByText(projectInfo.name).should("be.visible");
    cy.findByText(projectInfo.address).should("be.visible");
    cy.findByText(summary.expectedAIN).should("be.visible");
    cy.findByTestId("summary-project-level-value").should("have.text", summary.expectedLevel);
    cy.findByTestId("summary-parking-ratio-value").should("have.text", summary.expectedParkingRatioBaseline);
    cy.findByTestId("summary-target-points-value").should("have.text", summary.expectedTargetPoints);
    cy.findByTestId("summary-earned-points-value").should("have.text", summary.expectedEarnedPoints);
  });
});
