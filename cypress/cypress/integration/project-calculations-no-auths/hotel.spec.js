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
  changingShowerLocker: "Publicly Accessible AND in a disadvantaged area",
  carShareParking: "Publicly Accessible",
  transitDisplays: "Publicly visible",
  encouragementProgram: "Education, Marketing & Outreach",
  transitPasses: "50%-74% of monthly fare",
  // HOV Parking & Wayfinding are also "checked" below
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
    cy.get("#APN").type(projectInfo.ain);
    cy.goToNextPage(); // Go to Page 2
  });

  it("fills out project specifications and validates points (page 2)", () => {
    cy.findByTestId("UNITS_GUEST").type(specs.numberOfGuestRooms);

    // Check points and level at this point
    cy.get("#PROJECT_LEVEL").should("have.text", specs.expectedLevelBefore);
    cy.get("#TARGET_POINTS_PARK").should("have.text", specs.expectedTargetPointsBefore);
    cy.goToNextPage(); // Go to Page 3
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
    cy.get("#STRATEGY_BIKE_4").should("be.checked"); // Bike Parking should be pre-selected
    cy.get("#STRATEGY_BIKE_5").select(strategies.changingShowerLocker);
    cy.get("#STRATEGY_CAR_SHARE_1").select(strategies.carShareParking);
    cy.get("#STRATEGY_HOV_3").check(); // HOV Parking
    cy.get("#STRATEGY_INFO_1").select(strategies.transitDisplays);
    cy.get("#STRATEGY_INFO_2").check(); // Wayfinding
    cy.get("#STRATEGY_INFO_3").select(strategies.encouragementProgram);
    cy.get("#STRATEGY_TRANSIT_ACCESS_3").select(strategies.transitPasses);
    cy.goToNextPage();
  });

  it("validates summary page (page 6)", () => {
    cy.findByText(projectInfo.name).should("be.visible");
    cy.findByText(projectInfo.address).should("be.visible");
    cy.findByText(summary.expectedAIN).should("be.visible");
    cy.findByTestId("summary-project-level-value").should("have.text", summary.expectedLevel);
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
