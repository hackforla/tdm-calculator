/// <reference types="cypress" />

const projectInfo = {
  name: "Retail Flow",
  address: "123 S. Somewhere Ave",
  ain: "9999999999",
};

const specs = {
  retailSqFt: "100000",
  retailFurnitureSqFt: "200000",
  restaurantBarGeneralSqFt: "300000",
  healthClubSqFt: "400000",
  takeoutRestaurantSqFt: "2000",
  expectedTargetPoints: "25",
  expectedLevel: "3",
};

const calculate = {
  parkingProvided: "9000",
  expectedLevel: "3",
  expectedTargetPoints: "27",
  expectedCityParkingBaseline: "7808",
  expectedParkingRatioBaseline: "115.27",
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

describe("Verifies All Strategies", () => {
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
    cy.get("#SF_RETAIL").type(specs.retailSqFt);
    cy.get("#SF_FURNITURE").type(specs.retailFurnitureSqFt);
    cy.get("#SF_RESTAURANT").type(specs.restaurantBarGeneralSqFt);
    cy.get("#SF_HEALTH_CLUB").type(specs.healthClubSqFt);
    cy.get("#SF_RESTAURANT_TAKEOUT").type(specs.takeoutRestaurantSqFt);

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

  it("fills out strategies page and validates points (page 5)", () => {
    // Check defaults and initial state
    cy.get("#STRATEGY_AFFORDABLE").should("be.disabled"); // Affordable Housing
    cy.get("#STRATEGY_BIKE_4").should("be.checked"); // Bike Parking (required)
    cy.get("#STRATEGY_TELECOMMUTE_1").should("be.disabled"); // Telecommute
    cy.get("#STRATEGY_TELECOMMUTE_2").should("be.disabled"); // Televisits
    cy.get("#STRATEGY_HOV_4").should("be.disabled"); // HOV Program
    cy.get("#STRATEGY_INFO_5").should("be.disabled"); // School Safety Campaign
    cy.get("#STRATEGY_PARKING_1").should("be.disabled"); // Pricing/Unbundling
    cy.get("#PTS_EARNED").should("have.text", "2");

    // Bicycle Facilities
    cy.get("#STRATEGY_BIKE_3").select("Silver"); // Bike Memberships
    cy.get("#STRATEGY_BIKE_5").select("Publicly Accessible"); // Changing/Shower/Locker Facilities
    cy.get("#PTS_EARNED").should("have.text", "11");

    // Car Share
    cy.get("#STRATEGY_CAR_SHARE_1").select("Publicly Accessible"); // Car Share Parking
    cy.get("#STRATEGY_CAR_SHARE_3").select("Third party operator membership"); // Car Share Membership
    cy.get("#PTS_EARNED").should("have.text", "20");

    // Information
    cy.get("#STRATEGY_INFO_1").select("Internally visible"); // Transit Display
    cy.get("#STRATEGY_INFO_3").select("Education, Marketing & Outreach"); // Encouragement Project
    cy.get("#PTS_EARNED").should("have.text", "26");

    // Parking
    cy.get("#STRATEGY_PARKING_3").select("25%-49% spaces shared"); // Shared Parking
    cy.get("#PTS_EARNED").should("have.text", "27");

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
