import "@testing-library/cypress/add-commands";
/// <reference types="cypress" />

const projectInfo = {
  name: "School Flow",
  address: "12425 School Bl.",
  ain: "1234567890",
};

const specs = {
  elementaryMiddleSchoolStudents: "800",
  elementaryMiddleSchoolClassroom: "32",
  tradeSchoolStudents: "200",
  tradeSchoolSqFt: "2000",
  highSchoolStudents: "1100",
  highSchoolClassroom: "55",
  highSchoolAuditoriumSeats: "1111",
  highSchoolAuditoriumSqFt: "3000",
  expectedLevelBefore: "1",
  expectedTargetPointsBefore: "15",
};

const calculate = {
  parkingProvided: "225",
  expectedLevel: "1",
  expectedTargetPoints: "23",
  expectedCityParkingBaseline: "158",
  expectedParkingRatioBaseline: "142.41",
  expectedBonusPackage: "Employment Package",
};

const strategies = {
  expectedBeDisabled: "be.disabled",
  expectedBeChecked: "be.checked",
  expectedEncouragementProgramOption: "Education, Marketing & Outreach",
  expectedEncouragementProgramValue: "1",
  expectedEarnedPoints: "24", // after checking 4 more strategies below in test
};

const summary = {
  expectedAIN: "1234-567-890",
  expectedLevel: calculate.expectedLevel,
  expectedTargetPoints: calculate.expectedTargetPoints,
  expectedEarnedPoints: strategies.expectedEarnedPoints,
  expectedParkingRatioBaseline: `${Math.floor(calculate.expectedParkingRatioBaseline)}`,
};

describe("School Flow", () => {
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
    cy.findByTestId("STUDENTS_ELEMENTARY").type(specs.elementaryMiddleSchoolStudents);
    cy.findByTestId("CLASSROOM_SCHOOL").type(specs.elementaryMiddleSchoolClassroom);
    cy.findByTestId("STUDENTS_TRADE_SCHOOL").type(specs.tradeSchoolStudents);
    cy.findByTestId("SF_TRADE_SCHOOL").type(specs.tradeSchoolSqFt);
    cy.findByTestId("HS_STUDENTS").type(specs.highSchoolStudents);
    cy.findByTestId("HS_AUDITORIUM_SEATS")
      .should("exist")
      .type(specs.highSchoolAuditoriumSeats)
      .clear();
    cy.findByTestId("HS_AUDITORIUM_SF").type(specs.highSchoolAuditoriumSqFt);

    // Specifications Page - Check points and level at this point
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
    cy.goToNextPage(); // Go to Page 4
  });

  it("dispays bonus package (page 4)", () => {
    cy.findByText("You qualify for a bonus package!");
    cy.findByText("Employment Package");
    cy.goToNextPage(); // Go to Page 5
  });
  it("fills out strategies page and validates points (page 5)", () => {
    // Validates Disabled & Default Strategies
    cy.get("#STRATEGY_CAR_SHARE_1").should(strategies.expectedBeDisabled); // Parking
    cy.get("#STRATEGY_CAR_SHARE_3").should(strategies.expectedBeDisabled); // Membership
    cy.get("#STRATEGY_CAR_SHARE_4").should(strategies.expectedBeDisabled); // Private Car Shre Fleet
    cy.get("#STRATEGY_CAR_SHARE_ELECTRIC").should(strategies.expectedBeDisabled);
    cy.get("#STRATEGY_PARKING_1").should(strategies.expectedBeDisabled); // Pricing/Unbundling
    cy.get("#STRATEGY_TELECOMMUTE_1").should(strategies.expectedBeDisabled); // Telecommute
    cy.get("#STRATEGY_TELECOMMUTE_2").should(strategies.expectedBeDisabled); // Televisit
    cy.get("#STRATEGY_BIKE_4").should(strategies.expectedBeChecked); // Bike Parking should be pre-selected

    // Select Employment Package checkbox and validate strategies
    cy.get("#packageEmployment").check();
    cy.get("#STRATEGY_INFO_3").should("have.value", strategies.expectedEncouragementProgramValue); // Encouragement Program
    cy.get("#STRATEGY_INFO_3 option:selected").should(
      "have.text",
      strategies.expectedEncouragementProgramOption
    ); // Encouragement Program
    cy.get("#STRATEGY_PARKING_2").should(strategies.expectedBeChecked); // Cash-Out

    // Select additional strategies to meet target points
    cy.get("#STRATEGY_BIKE_2").check(); // Bike Share Station
    cy.get("#STRATEGY_INFO_5").check(); // School Safety Campaign
    cy.get("#STRATEGY_CHILD_CARE").check(); // Child Care
    cy.get("#STRATEGY_TMO_1").check(); // Join TMO
    cy.get("#PTS_EARNED").should("have.text", strategies.expectedEarnedPoints);
    cy.goToNextPage(); // Go to Summary Page
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
