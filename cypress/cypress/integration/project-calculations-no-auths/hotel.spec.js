import "@testing-library/cypress/add-commands";
/// <reference types="cypress" />

const projectInfo = {
  name: "Hotel/Motel Flow",
  address: "12425 Victory Bl.",
  ain: "1234567890",
};

const specs = {
  numberOfGuestRooms: "100",
  expectedLevelBefore: "2",
  expectedTargetPointsBefore: "20",
};

const calculate = {
  parkingProvided: "100",
  expectedLevel: "2",
  expectedTargetPoints: "30",
  expectedCityParkingBaseline: "57",
  expectedParkingRatioBaseline: "175.44",
};

const strategies = {
  expectedEarnedPoints: "31",
};

const summary = {
  expectedAIN: "1234-567-890",
  expectedLevel: calculate.expectedLevel,
  expectedTargetPoints: calculate.expectedTargetPoints,
  expectedEarnedPoints: strategies.expectedEarnedPoints,
  expectedParkingRatioBaseline: `${Math.floor(calculate.expectedParkingRatioBaseline)}`,
};

describe("Hotel/Motel Flow", () => {
  beforeEach(() => {
    window.localStorage.setItem("termsAndConditions", "Accepted");
  });

  it("fills out project info (page 1)", () => {
    cy.goToStart();

    cy.get("#PROJECT_NAME").type(projectInfo.name);
    cy.get("#PROJECT_ADDRESS").type(projectInfo.address);
    cy.get("#APN").type(projectInfo.ain).type("/t");
    cy.goToNextPage();
  });

  it("fills out project specifications and validates points (page 2)", () => {
    cy.findByTestId("UNITS_GUEST").type(specs.numberOfGuestRooms);

    cy.get("#PROJECT_LEVEL").should("have.text", specs.expectedLevelBefore);
    cy.get("#TARGET_POINTS_PARK").should("have.text", specs.expectedTargetPointsBefore);
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

  it("fills out strategies page and validates points (page 5)", () => {
    // Check defaults and initial state
    cy.get("#STRATEGY_AFFORDABLE").should("be.disabled"); // Affordable Housing
    cy.get("#STRATEGY_BIKE_4").should("be.checked"); // Bike Parking (required)
    cy.get("#STRATEGY_HOV_4").should("be.disabled"); // HOV Program
    cy.get("#STRATEGY_HOV_5").should("be.enabled"); // Mandatory Trip Reduction Project
    cy.get("#PTS_EARNED").should("have.text", "2");

    // Bicycle Facilities
    cy.get("#STRATEGY_BIKE_5").select("Publicly Accessible AND in a disadvantaged area"); // Changing/Shower/Locker Facilities
    cy.get("#PTS_EARNED").should("have.text", "7");

    // Car Share
    cy.get("#STRATEGY_CAR_SHARE_1").select("Publicly Accessible"); // Car Share Parking
    cy.get("#PTS_EARNED").should("have.text", "11");

    // High Occupancy Vehicles
    cy.get("#STRATEGY_HOV_3").check(); // HOV Parking
    cy.get("#PTS_EARNED").should("have.text", "13");

    // Information + High Occupancy Vehicles
    cy.get("#STRATEGY_INFO_1").select("Publicly visible"); // Transit Display
    cy.get("#STRATEGY_INFO_2").check(); // Wayfinding
    cy.get("#STRATEGY_INFO_3").select("Education, Marketing & Outreach"); // Encouragement Program
    cy.get("#STRATEGY_HOV_5").should("be.disabled"); // Mandatory Trip Reduction Project disabled if Encouragement Program is selected
    cy.get("#PTS_EARNED").should("have.text", "21");

    // Transit Access
    cy.get("#STRATEGY_TRANSIT_ACCESS_3").select("50%-74% of monthly fare");
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
