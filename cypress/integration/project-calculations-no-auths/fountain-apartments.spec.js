//Reference : https://github.com/testing-library/cypress-testing-library
import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />
describe("Fountain Apartments", () => {
  describe("project inputs", () => {
    it("enters project information - minimum requirements", () => {
      cy.visit("http://localhost:3000/");
      cy.findAllByText("New Project").click();
      cy.findByLabelText("Project Name").type("Fountain Apartments");
      cy.findByLabelText("Address").type("5460 W. Fountain Av.");
      cy.findByLabelText("Project Description").type(
        "A 75-unit six-story apartment building"
      );
      cy.findByTestId(">").click();
    });
    it("enters information for selected development type(s)", () => {
      cy.findByLabelText("# Habitable Rooms < 3").type("37");
      cy.findByLabelText("# Habitable Rooms = 3").type("36");
      cy.findByLabelText("# Habitable Rooms > 3").type("2");
      cy.findByTestId(">").click();
    });
    it("enters in number of parking spaces", () => {
      cy.findByLabelText("Parking Provided").type("108");
      cy.findByText("95").should("exist");
      cy.findByText("113.68").should("exist");
      cy.findByTestId(">").click();
    });
  });
  describe("project strategies", () => {
    it("selects transporation demand strategies and receive enough earned points", () => {
      cy.findByLabelText("Bike Parking").click();
      cy.findByLabelText("Car Share Parking").click();
      cy.findByLabelText("Wayfinding").click();
      cy.findByLabelText("Encouragement Program").select(
        "Education, Marketing & Outreach"
      );
      cy.findByLabelText("Pricing/Unbundling").click();
      cy.findByLabelText("Existing Provider").click();
      cy.findByLabelText("Affordable Housing Level").select(
        "35% of State Density Bonus"
      );
      cy.findByTestId(">").click();
    });
  });
  describe("calculation summary", () => {
    it("shows the correct calculation summary", () => {
      cy.findByText("Fountain Apartments").should("exist");
      cy.findByText("5460 W. Fountain Av.").should("exist");
      cy.findByText("A 75-unit six-story apartment building").should("exist");

      cy.findAllByText("Residential").should("exist");

      cy.findByTestId("summary-project-level-value").should("have.text", "2");
      cy.findByTestId("summary-project-level-label").should(
        "have.text",
        "Project Level"
      );

      cy.findByTestId("summary-parking-ratio-value").should(
        "have.text",
        "113 %"
      );
      cy.findByTestId("summary-parking-ratio-label").should(
        "have.text",
        "Parking Provided / Baseline"
      );

      cy.findByTestId("summary-target-points-value").should("have.text", "22");
      cy.findByTestId("summary-target-points-label").should(
        "have.text",
        "Target Points"
      );

      cy.findByTestId("summary-earned-points-value").should("have.text", "22");
      cy.findByTestId("summary-earned-points-label").should(
        "have.text",
        "Earned Points"
      );
    });
  });
});
