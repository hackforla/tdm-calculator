/// <reference types="cypress" />

const projectInfo = {
  name: "Medical Care Flow",
  address: "123 S. Somewhere Ave",
  ain: "9999999999",
};

const specs = {
  medicalOfficeClinicsFacilitiesSqFt: "123123",
  hospitalSqFt: "123123",
  patientHospitalBeds: "123123",
  convalescentSqFt: "123123",
  convalescentInstitutionBeds: "123123",
  expectedTargetPoints: "25",
  expectedLevel: "3",
};

const calculate = {
  parkingProvided: "400000",
  expectedLevel: "3",
  expectedTargetPoints: "33",
  expectedCityParkingBaseline: "271486.22",
  expectedParkingRatioBaseline: "147.34",
};

const strategies = {
  expectedEarnedPoints: "34",
};

const summary = {
  expectedAIN: "9999-999-999",
  expectedLevel: calculate.expectedLevel,
  expectedTargetPoints: calculate.expectedTargetPoints,
  expectedEarnedPoints: strategies.expectedEarnedPoints,
  expectedParkingRatioBaseline: `${Math.floor(calculate.expectedParkingRatioBaseline)}`,
};

describe("Medical Care Flow", () => {
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
    cy.get("#SF_INST_MEDICAL_SVC").type(specs.medicalOfficeClinicsFacilitiesSqFt);
    cy.get("#SF_HOSPITAL").type(specs.hospitalSqFt);
    cy.get("#BED_HOSPITAL").type(specs.patientHospitalBeds);
    cy.get("#SF_CONVALESCENT").type(specs.convalescentSqFt);
    cy.get("#BED_CONVALESCENT").type(specs.convalescentInstitutionBeds);

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
    cy.get("#STRATEGY_AFFORDABLE").should("be.disabled"); // Affordable Housing
    cy.get("#STRATEGY_BIKE_4").should("be.checked"); // Bike Parking (required)
    cy.get("#STRATEGY_PARKING_1").should("be.disabled"); // Pricing/Unbundling
    cy.get("#PTS_EARNED").should("have.text", "2");

    // Parking
    cy.get("#STRATEGY_PARKING_3").select("100% spaces shared"); // Shared Parking
    cy.get("#PTS_EARNED").should("have.text", "6");

    //Telecommute
    cy.get("#STRATEGY_TELECOMMUTE_1").select("4 days"); // Telecommute
    cy.get("#PTS_EARNED").should("have.text", "11");

    // Transit Access
    cy.get("#STRATEGY_TRANSIT_ACCESS_1").select("Connects to HQTA and if publicly available and in disadvantaged area"); // Neighborhood Shuttles/ Microtransit Service
    cy.get("#STRATEGY_TRANSIT_ACCESS_3").select("100% of monthly fare"); // Transit Passes
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
