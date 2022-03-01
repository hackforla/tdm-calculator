/// <reference types="cypress" />

const projectInfo = {
  name: "Testing Every Strategy!",
  address: "123 S. Somewhere Ave",
  ain: "9999999999",
  version: "1",
  buildingPermit: "54321",
  ladotCase: "67890",
  laPlanningCase: "09876",
  description: "and fill in something each development type",
};

const specs = {
  habitableLessThan3: "1000",
  numberOfGuestRooms: "5000",
  retailSqFt: "90000",
  employmentOfficeSqFt: "80000",
  warehouseSpaceSqFt: "700000",
  medicalCareSqFt: "6000000",
  tradeSchoolStudents: "3000",
  tradeSchoolSqFt: "50000",
  specialUsesSqFt: "200000",
  expectedTargetPoints: "25",
  expectedLevel: "3",
};

const calculate = {
  parkingProvided: "77777",
  expectedLevel: "3",
  expectedTargetPoints: "35",
  expectedCityParkingBaseline: "39902",
  expectedParkingRatioBaseline: "194.92",
};

const strategies = {
  expectedEarnedPoints: "132",
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
    cy.get("#APN").type(projectInfo.ain).type("\t");
    cy.get("#VERSION_NO").type(projectInfo.version);
    cy.get("#BUILDING_PERMIT").type(projectInfo.buildingPermit);
    cy.get("#CASE_NO_LADOT").type(projectInfo.ladotCase);
    cy.get("#CASE_NO_PLANNING").type(projectInfo.laPlanningCase);
    cy.get("#PROJECT_DESCRIPTION").type(projectInfo.description);
    cy.goToNextPage();
  });

  it("fills out random project specifications in each development type (page 2)", () => {
    cy.get("#UNITS_HABIT_LT3").type(specs.habitableLessThan3);
    cy.get("#AFFORDABLE_HOUSING").check();
    cy.findByTestId("UNITS_GUEST").type(specs.numberOfGuestRooms);
    cy.get("#SF_RETAIL").type(specs.retailSqFt);
    cy.get("#SF_INST_OTHER").type(specs.employmentOfficeSqFt);
    cy.get("#SF_WAREHOUSE").type(specs.warehouseSpaceSqFt);
    cy.get("#SF_INST_MEDICAL_SVC").type(specs.medicalCareSqFt);
    cy.findByTestId("STUDENTS_TRADE_SCHOOL").type(specs.tradeSchoolStudents);
    cy.findByTestId("SF_TRADE_SCHOOL").type(specs.tradeSchoolSqFt);
    cy.get("#SF_AUDITORIUM_NO_SEATS").type(specs.specialUsesSqFt);

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

  it("fills out ALL strategies and validates points (page 5)", () => {
    // Affordable Housing
    cy.get("#STRATEGY_AFFORDABLE").select("20% of State Density Bonus");
    cy.get("#PTS_EARNED").should("have.text", "4");

    // Bicycle Facilities
    cy.get("#STRATEGY_BIKE_1").check(); // Locate Near Bike Share
    cy.get("#STRATEGY_BIKE_2").check(); // Bike Station
    cy.get("#STRATEGY_BIKE_3").select("Bronze"); // Bike Memberships
    cy.get("#STRATEGY_BIKE_4").should("be.checked"); // Bike Parking (required)
    cy.get("#STRATEGY_BIKE_5").select("Private"); // Changing/Shower/Locker Facilities
    cy.get("#PTS_EARNED").should("have.text", "19");

    // Car Share
    cy.get("#STRATEGY_CAR_SHARE_1").select("Private"); // Car Share Parking
    cy.get("#STRATEGY_CAR_SHARE_3").select("BlueLA"); // Car Share Membership
    cy.get("#STRATEGY_CAR_SHARE_4").check(); // Car Share Membership
    cy.get("#STRATEGY_CAR_SHARE_ELECTRIC").check(); // Electric Vehicle
    cy.get("#PTS_EARNED").should("have.text", "34");

    // Child Care
    cy.get("#STRATEGY_CHILD_CARE").check(); // Child Chare
    cy.get("#PTS_EARNED").should("have.text", "36");

    // High Occupancy Vehicles
    cy.get("#STRATEGY_HOV_2").check(); // Guaranteed Return Trip
    cy.get("#STRATEGY_HOV_3").check(); // HOV Parking
    cy.get("#STRATEGY_HOV_4").check(); // HOV Program
    cy.get("#STRATEGY_HOV_5").check(); // Mandatory Trip Reduction Project
    cy.get("#PTS_EARNED").should("have.text", "50");

    // Information
    cy.get("#STRATEGY_INFO_1").select("Publicly visible"); // Transit Display
    cy.get("#STRATEGY_INFO_2").check(); // Wayfinding
    cy.get("#STRATEGY_INFO_5").check(); // School Safety Campaign
    cy.get("#PTS_EARNED").should("have.text", "58");

    // Information + High Occupancy Vehicles
    cy.get("#STRATEGY_INFO_3").should("be.disabled"); // Encouragement Project should be disabled if #STRATEGY_HOV_5 is selected
    cy.get("#STRATEGY_HOV_5").uncheck(); // Uncheck Mandatory Trip Reduction Project
    cy.get("#STRATEGY_INFO_3").select("Voluntary Behavior Change Program"); // Encouragement Project should be enabled and clickable
    cy.get("#STRATEGY_HOV_5").should("be.disabled"); // Mandatory Trip Reduction Project should be disabled if #STRATEGY_INFO_3 is selected
    cy.get("#PTS_EARNED").should("have.text", "56");

    // Mixed Use
    cy.get("#STRATEGY_MIXED_USE").check(); // Mixed Use
    cy.get("#PTS_EARNED").should("have.text", "61");

    // Mobility Investment
    cy.get("#STRATEGY_MOBILITY_INVESTMENT_1").select("25-49% of 1/4 mi walkshed"); // Access Improvement
    cy.get("#STRATEGY_MOBILITY_INVESTMENT_2").select("$50,000-$199,999"); // Mobility Management
    cy.get("#PTS_EARNED").should("have.text", "67");

    // Parking
    cy.get("#STRATEGY_PARKING_1").select("Each parking space is at least $25 a month"); // Pricing/Unbundling
    cy.get("#STRATEGY_PARKING_2").check(); // Cash Out
    cy.get("#STRATEGY_PARKING_3").select("75%-99% spaces shared"); // Shared Parking
    cy.get("#STRATEGY_PARKING_4").check(); // Public Parking
    cy.get("#STRATEGY_PARKING_5").select("Reduces 75%-99% of spaces available"); // Reduced Parking Supply
    cy.get("#PTS_EARNED").should("have.text", "87");

    //Shared Micro-Mobility
    cy.get("#STRATEGY_SHARED_MOBILITY_1").check(); // Existing Provider
    cy.get("#STRATEGY_SHARED_MOBILITY_2").check(); // Local Shared Fleet
    cy.get("#PTS_EARNED").should("have.text", "89");

    //Telecommute
    cy.get("#STRATEGY_TELECOMMUTE_1").select("3 days"); // Telecommute
    cy.get("#STRATEGY_TELECOMMUTE_2").check(); // Televisits
    cy.get("#PTS_EARNED").should("have.text", "96");

    // Transit Access
    cy.get("#STRATEGY_TRANSIT_ACCESS_1").select("Connects to HQTA"); // Neighborhood Shuttles/ Microtransit Service
    cy.get("#STRATEGY_TRANSIT_ACCESS_3").select("25%-49% of monthly fare"); // Transit Passes
    cy.get("#STRATEGY_TRANSIT_ACCESS_4").check(); // Improved Transit Service
    cy.get("#STRATEGY_TRANSIT_ACCESS_5").check(); // Electric Transit Vehicle Bonus
    cy.get("#PTS_EARNED").should("have.text", "112");

    // Transportation Management Organization
    cy.get("#STRATEGY_TMO_1").check(); // Join TMO
    cy.get("#STRATEGY_TMO_2").check(); // Start a new TMO
    cy.get("#PTS_EARNED").should("have.text", "118");

    // User-Defined Strategy
    cy.get("#STRATEGY_APPLICANT").type("14"); // User-Defined Strategy
    cy.get("#STRATEGY_APPLICANT_COMMENTS").type("This is the reason for User-Defined Strategy");
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
