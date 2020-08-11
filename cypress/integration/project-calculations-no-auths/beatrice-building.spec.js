//Reference : https://github.com/testing-library/cypress-testing-library
import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />
describe("Beatrice Building", () => {
  describe("project inputs", () => {
    it("enters project information - minimum requirements", () => {
      cy.visit("/");
      cy.findAllByText("New Project").click();
      cy.findByLabelText("Project Name").type("Beatrice Building");
      cy.findByLabelText("Address").type("12575 Beatrice St.");
      cy.findByLabelText("Project Description").type(
        "Sq Ft differs between spreadsheet and PDF supplied"
      );
      cy.findByTestId(">").click();
    });
    it("enters information for selected development type(s)", () => {
      cy.findByLabelText("Sq Ft - Retail").type("900");
      cy.findByLabelText("Sq Ft - Restaurant/Bar/General").type("2500");
      cy.findByLabelText(
        "Sq Ft - Office, Business, Manufacturing, Industrial"
      ).type("283981");
      cy.findByTestId(">").click();
    });
    it("enters in number of parking spaces", () => {
      cy.findByLabelText("Parking Provided").type("845");
      cy.findByText("597").should("exist");
      cy.findByText("141.54").should("exist");
      cy.findByTestId(">").click();
    });
  });
  describe("project strategies", () => {
    it("selects transporation demand strategies and receive enough earned points", () => {
      cy.findByLabelText("Bike Parking").click();
      cy.findByLabelText("Changing / Shower / Locker Facilities").click();
      cy.findByLabelText("Car Share Parking").click();
      cy.findByLabelText("HOV Parking").click();
      cy.findByLabelText("Transit Displays").click();
      cy.findByLabelText("Wayfinding").click();
      cy.findByLabelText("Encouragement Program").select(
        "Education, Marketing & Outreach"
      );
      cy.findByLabelText("Cash-Out").click();
      cy.findByLabelText("Transit Passes").select("25%+ of Monthly Fare");
      cy.findByTestId(">").click();
    });
  });
  describe("calculation summary", () => {
    it("shows the correct calculation summary", () => {
      cy.findByText("Beatrice Building").should("exist");
      cy.findByText("12575 Beatrice St.").should("exist");
      cy.findByText(
        "Sq Ft differs between spreadsheet and PDF supplied"
      ).should("exist");

      cy.findAllByText("Retail, Commercial").should("exist");

      cy.findByTestId("summary-project-level-value").should("have.text", "3");
      cy.findByTestId("summary-project-level-label").should(
        "have.text",
        "Project Level"
      );

      cy.findByTestId("summary-parking-ratio-value").should(
        "have.text",
        "141 %"
      );
      cy.findByTestId("summary-parking-ratio-label").should(
        "have.text",
        "Parking Provided / Baseline"
      );

      cy.findByTestId("summary-target-points-value").should("have.text", "33");
      cy.findByTestId("summary-target-points-label").should(
        "have.text",
        "Target Points"
      );

      cy.findByTestId("summary-earned-points-value").should("have.text", "33");
      cy.findByTestId("summary-earned-points-label").should(
        "have.text",
        "Earned Points"
      );
    });
  });
});
