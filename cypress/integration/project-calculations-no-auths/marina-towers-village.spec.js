//Reference : https://github.com/testing-library/cypress-testing-library
import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />
describe("Marina Towers Village", () => {
  describe("project inputs", () => {
    it("enters project information - minimum requirements", () => {
      cy.visit("http://localhost:3000/");
      cy.findAllByText("New Project").click();
      cy.findByLabelText("Project Name").type("Marina Towers Village");
      cy.findByLabelText("Address").type("13428 Maxella Ave");
      cy.findByLabelText("Project Description").type(
        "A mixed use development scheduled for 2025"
      );
      cy.findByTestId(">").click();
    });
    it("enters information for selected development type(s)", () => {
      cy.findByLabelText("# Habitable Rooms < 3").type("140");
      cy.findByLabelText("Sq Ft - Restaurant/Bar/General").type("30000");
      cy.findByLabelText(
        "Sq Ft - Office, Business, Manufacturing, Industrial"
      ).type("100000");
      cy.findByTestId(">").click();
    });
    it("enters in number of parking spaces", () => {
      cy.findByLabelText("Parking Provided").type("1000");
      cy.findByText("640").should("exist");
      cy.findByText("156.25").should("exist");
      cy.findByTestId(">").click();
    });
  });
  describe("project strategies", () => {
    it("selects transporation demand strategies and receive enough earned points", () => {
      cy.findByLabelText("Bike Share Station").click();
      cy.findByLabelText("Bike Share Memberships").click();
      cy.findByLabelText("Bike Parking").click();
      cy.findByLabelText("Encouragement Program").select(
        "Education, Marketing & Outreach"
      );
      cy.findByLabelText("Cash-Out").click();
      cy.findByLabelText("Pricing/Unbundling").click();
      cy.findByTestId(">").click();
    });
  });
  describe("calculation summary", () => {
    it("shows the correct calculation summary", () => {
      cy.findByText("Marina Towers Village").should("exist");
      cy.findByText("13428 Maxella Ave").should("exist");
      cy.findByText("A mixed use development scheduled for 2025").should(
        "exist"
      );

      cy.findAllByText("Residential, Commercial").should("exist");

      cy.findByTestId("summary-project-level-value").should("have.text", "3");
      cy.findByTestId("summary-project-level-label").should(
        "have.text",
        "Project Level"
      );

      cy.findByTestId("summary-parking-ratio-value").should(
        "have.text",
        "156 %"
      );
      cy.findByTestId("summary-parking-ratio-label").should(
        "have.text",
        "Parking Provided / Baseline"
      );

      cy.findByTestId("summary-target-points-value").should("have.text", "35");
      cy.findByTestId("summary-target-points-label").should(
        "have.text",
        "Target Points"
      );

      cy.findByTestId("summary-earned-points-value").should("have.text", "36");
      cy.findByTestId("summary-earned-points-label").should(
        "have.text",
        "Earned Points"
      );
    });
  });
});
