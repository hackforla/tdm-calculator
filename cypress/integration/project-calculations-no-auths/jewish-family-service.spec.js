//Reference : https://github.com/testing-library/cypress-testing-library
import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />
describe("Jewish Family Service", () => {
  describe("project inputs", () => {
    it("enters project information - minimum requirements", () => {
      cy.visit("http://localhost:3000/");
      cy.findAllByText("New Project").click();
      cy.findByLabelText("Project Name").type(
        "Jewish Family Service - Social Services Center"
      );
      cy.findByLabelText("Address").type("320 N. Fairfax Av.");
      cy.findByLabelText("Project Description").type(
        "New 28,023 sf three-story building"
      );
      cy.findByTestId(">").click();
    });
    it("enters information for selected development type(s)", () => {
      cy.findByLabelText(
        "Sq Ft - Office, Business, Manufacturing, Industrial"
      ).type("28341");
      cy.findByTestId(">").click();
    });
    it("enters in number of parking spaces", () => {
      cy.findByLabelText("Parking Provided").type("63");
      cy.findByText("57").should("exist");
      cy.findByText("110.53").should("exist");
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
      cy.findByTestId(">").click();
    });
  });
  describe("calculation summary", () => {
    it("shows the correct calculation summary", () => {
      cy.findByText("Jewish Family Service - Social Services Center").should(
        "exist"
      );
      cy.findByText("320 N. Fairfax Av.").should("exist");
      cy.findByText("New 28,023 sf three-story building").should("exist");

      cy.findAllByText("Commercial").should("exist");

      cy.findByTestId("summary-project-level-value").should("have.text", "1");
      cy.findByTestId("summary-project-level-label").should(
        "have.text",
        "Project Level"
      );

      cy.findByTestId("summary-parking-ratio-value").should(
        "have.text",
        "110 %"
      );
      cy.findByTestId("summary-parking-ratio-label").should(
        "have.text",
        "Provided / Required Parking"
      );

      cy.findByTestId("summary-target-points-value").should("have.text", "17");
      cy.findByTestId("summary-target-points-label").should(
        "have.text",
        "Target Points"
      );

      cy.findByTestId("summary-earned-points-value").should("have.text", "17");
      cy.findByTestId("summary-earned-points-label").should(
        "have.text",
        "Earned Points"
      );
    });
  });
});
