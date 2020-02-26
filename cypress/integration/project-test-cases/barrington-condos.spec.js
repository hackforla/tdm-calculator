//Reference : https://github.com/testing-library/cypress-testing-library
import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />
describe("barrington condos", () => {
  describe("project inputs", () => {
    it("should enter project information - minimum requirements", () => {
      cy.visit("http://localhost:3000/");
      cy.findAllByText("New Project").click();
      cy.findByLabelText("Project Name").type("Barrington Condos");
      cy.findByLabelText("Address").type("825 S. Barrington Ave");
      cy.findByTestId(">").click();
    });
    it("should select development type", () => {
      cy.findByLabelText("Residential").click();
      cy.findByTestId(">").click();
    });
    it("should enter information for selected development type(s)", () => {
      cy.findByLabelText("Condo - Units").type("46");
      cy.findByLabelText("Condo - Enter Parking Space Req'd").type("92");
      cy.findByTestId(">").click();
    });
    it("should enter in number of parking spaces", () => {
      cy.findByLabelText("Parking Provided").type("88");
      cy.findByText("92 spcs").should("exist");
      cy.findByText("95.65 %").should("exist");
      cy.findByText("15 pts").should("exist");
      cy.findByTestId(">").click();
    });
  });
  describe("project strategies", () => {
    it("should select transporation demand strategies and receive enough earned points", () => {
      // Note: we could take out the "should have values" assertion after we add unit tests
      cy.findByLabelText("Bike Parking")
        .click()
        .should("have.value", "true");
      cy.findByLabelText("Pricing/Unbundling")
        .click()
        .should("have.value", "true");
      cy.findByLabelText("Reduced Parking Supply")
        .click()
        .should("have.value", "true");
      cy.findByLabelText("Affordable Housing Level")
        .select("35% of State Density Bonus")
        .should("have.value", "1");
      cy.findByTestId(">").click();
    });
  });

  describe("calculation summary", () => {
    it("should show the correct calculation summary", () => {
      // Note for Dev team: this part of the test could be improved;
      // Best Practices: cypress should not need to use const/let

      cy.findByText("Barrington Condos").should("exist");
      cy.findByText("825 S. Barrington Ave").should("exist");

      // eslint-disable-next-line cypress/no-assigning-return-values
      const projectLevel = cy.findByTestId("summary-project-level").children();
      projectLevel.first().should("have.text", "1");
      projectLevel.next().should("have.text", "Project Level");

      // eslint-disable-next-line cypress/no-assigning-return-values
      const providedRequiredParking = cy
        .findByTestId("summary-parking-ratio")
        .children();
      providedRequiredParking.first().should("have.text", "95 %");
      providedRequiredParking
        .next()
        .should("have.text", "Provided / Required Parking");

      // eslint-disable-next-line cypress/no-assigning-return-values
      const targetPoints = cy.findByTestId("summary-target-points").children();
      targetPoints.first().should("have.text", "15");
      targetPoints.next().should("have.text", "Target Points");

      // eslint-disable-next-line cypress/no-assigning-return-values
      const earnedPoints = cy.findByTestId("summary-earned-points").children();
      earnedPoints.first().should("have.text", "16");
      earnedPoints.next().should("have.text", "Earned Points");

      cy.findAllByText("Residential").should("exist");
    });
  });
});

// TODO: Check on using getting rid of const/let/var for "best practices" using cypress
// Below does not work yet
// describe("calculation summary", () => {
//   it("should show the correct calculation summary", () => {
//     // Note for Dev team: this part of the test could be improved so that there's less coupling

//     cy.findByText("Barrington Condos").should("exist");
//     cy.findByText("825 S. Barrington Ave").should("exist");

//     cy.findByTestId("summary-project-level")
//       .children()
//       .then($projectLevel => {
//         console.log('projectLevel', $projectLevel)
//         $projectLevel.first.should("have.text", "1");
//         $projectLevel.next.should("have.text", "Project Level");
//       });

//     cy.findByTestId("summary-parking-ratio")
//       .children()
//       .then($providedRequiredParking => {
//         $providedRequiredParking.first.should("have.text", "95 %");
//         $providedRequiredParking
//           .next.should("have.text", "Provided / Required Parking");
//       });

//     cy.findByTestId("summary-target-points")
//       .children()
//       .then($targetPoints => {
//         $targetPoints.first.should("have.text", "15");
//         $targetPoints.next.should("have.text", "Target Points");
//       });

//     cy.findByTestId("summary-earned-points")
//       .children()
//       .then($earnedPoints => {
//         $earnedPoints.first.should("have.text", "16");
//         $earnedPoints.next.should("have.text", "Earned Points");
//       });

//     cy.findAllByText("Residential").should("exist");
//   });
// });
