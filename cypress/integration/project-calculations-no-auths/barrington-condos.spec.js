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
  pricingUnbundling: "the cost of each parking space is $220/mo",
  reducedParkingSupply:
    "Reduces 100% of the parking spaces available relative to the  parking baseline",
  affordableHousingLevel: "35% of State Density Bonus",
  expectedProjectLevelLabel: "Project Level",
  expectedProjectLevelValue: "1",
  expectedParkingRatioLabel: "Parking Provided / Baseline",
  expectedParkingRatioValue: "95%",
  expectedTargetPointsLabel: "Target Points",
  expectedTargetPointsValue: "15",
  expectedEarnedPointsLabel: "Earned Points",
  expectedEarnedPointsValue: "16"
};

describe("Barrington Condos", () => {
  context("project inputs", () => {
    it("enters project information - minimum requirements", () => {
      cy.visit("/");
      cy.findAllByText("Create Project").click();
      cy.findByLabelText("Project Name").type(p.projectName);
      cy.findByLabelText("Address").type(p.address);
      cy.findByLabelText("AIN").type(p.ain);
      cy.findByTestId("rightNavArrow").click();
    });
    it("enters project specification", () => {
      cy.findByLabelText("Condo - Units").type(p.condoUnits);
      cy.findByLabelText("..... Enter Parking Spaces req'd").type(
        p.requiredParkingSpaces
      );
      cy.findByTestId("rightNavArrow").click();
    });
    it("enters in number for parking spaces provided", () => {
      cy.findByLabelText("Parking Provided").type(p.parkingProvided);
      cy.findByText(p.expectedParkingBaselineSpaces).should("be.visible");
      cy.findByText(p.expectedParkingBaselinePercentage).should("be.visible");
      cy.findByTestId("rightNavArrow").click();
    });
  });
  context("project strategies", () => {
    it("selects transporation demand strategies and receive enough earned points", () => {
      cy.findByLabelText("Bike Parking").should("be.checked");
      cy.findByLabelText("Pricing/Unbundling").select(p.pricingUnbundling);
      cy.findByLabelText("Reduced Parking Supply").select(
        p.reducedParkingSupply
      );
      cy.findByLabelText("Affordable Housing Level").select(
        p.affordableHousingLevel
      );
      cy.findByTestId("rightNavArrow").click();
    });
  });
  context("calculation summary", () => {
    it("shows the correct calculation summary", () => {
      cy.findByText(p.projectName).should("be.visible");
      cy.findByText(p.address).should("be.visible");

      cy.findByTestId("summary-project-level-label").should(
        "have.text",
        p.expectedProjectLevelLabel
      );
      cy.findByTestId("summary-project-level-value").should(
        "have.text",
        p.expectedProjectLevelValue
      );

      cy.findByTestId("summary-parking-ratio-label").should(
        "have.text",
        p.expectedParkingRatioLabel
      );
      cy.findByTestId("summary-parking-ratio-value").should(
        "have.text",
        p.expectedParkingRatioValue
      );

      cy.findByTestId("summary-target-points-label").should(
        "have.text",
        p.expectedTargetPointsLabel
      );
      cy.findByTestId("summary-target-points-value").should(
        "have.text",
        p.expectedTargetPointsValue
      );

      cy.findByTestId("summary-earned-points-label").should(
        "have.text",
        p.expectedEarnedPointsLabel
      );
      cy.findByTestId("summary-earned-points-value").should(
        "have.text",
        p.expectedEarnedPointsValue
      );
    });
  });
});
