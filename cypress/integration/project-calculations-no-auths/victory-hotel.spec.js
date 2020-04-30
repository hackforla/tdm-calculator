//Reference : https://github.com/testing-library/cypress-testing-library
import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />
describe("Victory Hotel", () => {
  describe("project inputs", () => {
    it("should enter project information - minimum requirements", () => {
      cy.visit("http://localhost:3000/");
      cy.findAllByText("New Project").click();
      cy.findByLabelText("Project Name").type("Victory Hotel");
      cy.findByLabelText("Address").type("12425 Victory Bl.");
      cy.findByLabelText("Project Description").type(
        "80-room four-story hotel"
      );
      cy.findByTestId(">").click();
    });
    it("should select development type", () => {
      cy.findByLabelText("Hotel").click();
      cy.findByTestId(">").click();
    });
    it("should enter information for selected development type(s)", () => {
      cy.findByLabelText("# Guest Rooms").type("80");
      cy.findByTestId(">").click();
    });
    it("should enter in number of parking spaces", () => {
      cy.findByLabelText("Parking Provided").type("76");
      cy.findByText("51 spcs").should("exist");
      cy.findByText("149.02 %").should("exist");
      cy.findByTestId(">").click();
    });
  });
  describe("project strategies", () => {
    it("should select transporation demand strategies and receive enough earned points", () => {
      cy.findByLabelText("Bike Parking").click();
      cy.findByLabelText("Changing / Shower / Locker Facilities").click();
      cy.findByLabelText("Car Share Parking").click();
      cy.findByLabelText("Ride Matching").click();
      cy.findByLabelText("HOV Parking").click();
      cy.findByLabelText("Transit Displays").click();
      cy.findByLabelText("Wayfinding").click();
      cy.findByLabelText("Encouragement Program").select(
        "Education, Marketing & Outreach"
      );
      cy.findByLabelText("Correct Substandard Infrastructure").select(
        "25%+ streets improved"
      );
      cy.findByLabelText("Transit Passes").select("25%+ of Monthly Fare");
      cy.findByTestId(">").click();
    });
  });
  describe("calculation summary", () => {
    it("should show the correct calculation summary", () => {
      cy.findByText("Victory Hotel").should("exist");
      cy.findByText("12425 Victory Bl.").should("exist");
      cy.findByText("80-room four-story hotel").should("exist");

      cy.findAllByText("Hotel").should("exist");

      cy.findByTestId("summary-project-level-value").should("have.text", "2");
      cy.findByTestId("summary-project-level-label").should(
        "have.text",
        "Project Level"
      );

      cy.findByTestId("summary-parking-ratio-value").should(
        "have.text",
        "149 %"
      );
      cy.findByTestId("summary-parking-ratio-label").should(
        "have.text",
        "Provided / Required Parking"
      );

      cy.findByTestId("summary-target-points-value").should("have.text", "28");
      cy.findByTestId("summary-target-points-label").should(
        "have.text",
        "Target Points"
      );

      cy.findByTestId("summary-earned-points-value").should("have.text", "28");
      cy.findByTestId("summary-earned-points-label").should(
        "have.text",
        "Earned Points"
      );
    });
  });
});
