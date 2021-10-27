/// <reference types="cypress" />

const projectInfo = {
  name: "Special Uses Flow",
  address: "123 S. Somewhere Ave",
  ain: "9999999999",
};

const specs = {
  withSeatsArenaStadiumTheatherSeats: "9000111",
  withoutSeatsArenaStadiumTheatherSqFt: "888777888",
  expectedTargetPoints: "25",
  expectedLevel: "3",
};

const calculate = {
  parkingProvided: "33111000",
  expectedLevel: "3",
  expectedTargetPoints: "29",
  expectedCityParkingBaseline: "27193677",
  expectedParkingRatioBaseline: "121.76",
};

const strategies = {
  expectedEarnedPoints: "29",
};

const summary = {
  expectedAIN: "9999-999-999",
  expectedLevel: calculate.expectedLevel,
  expectedTargetPoints: calculate.expectedTargetPoints,
  expectedEarnedPoints: strategies.expectedEarnedPoints,
  expectedParkingRatioBaseline: `${Math.floor(calculate.expectedParkingRatioBaseline)}`,
};

describe("Special Uses Flow", () => {
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
    cy.get("#SEAT_AUDITORIUM").type(specs.withSeatsArenaStadiumTheatherSeats);
    cy.get("#SF_AUDITORIUM_NO_SEATS").type(specs.withoutSeatsArenaStadiumTheatherSqFt);

    cy.get("#PROJECT_LEVEL").should("have.text", specs.expectedLevel);
    cy.get("#TARGET_POINTS_PARK").should("have.text", specs.expectedTargetPoints);
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
    cy.get("#STRATEGY_AFFORDABLE").should("be.disabled"); // Affordable housing
    cy.get("#STRATEGY_BIKE_4").should("be.checked"); // Bike Parking (required)
    cy.get("#STRATEGY_PARKING_1").should("be.disabled");
    cy.get("#PTS_EARNED").should("have.text", "2");

    // Parking
    cy.get("#STRATEGY_PARKING_5").select("Reduces 50%-74% of spaces available"); // Reduced Parking Supply
    cy.get("#PTS_EARNED").should("have.text", "6");

    //Telecommute
    cy.get("#STRATEGY_TELECOMMUTE_1").select("3 days"); // Telecommute
    cy.get("#PTS_EARNED").should("have.text", "10");

    // Transit Access
    cy.get("#STRATEGY_TRANSIT_ACCESS_1").select(
      "Does not connect to HQTA and if publicly available and in disadvantaged area"
    ); // Neighborhood Shuttles/ Microtransit Service
    cy.get("#STRATEGY_TRANSIT_ACCESS_3").select("75%-99% of monthly fare"); // Transit Passes
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
