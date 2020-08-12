//Reference : https://github.com/testing-library/cypress-testing-library
import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />
describe("Barrington Condos", () => {
  context("project inputs", () => {
    it("enters project information - minimum requirements", () => {
      cy.loginViaUIAs("test_regular_user@dispostable.com", "Dogfood1");

      cy.findByLabelText("Project Name").type("Barrington Condos");
      cy.findByLabelText("Address").type("825 S. Barrington Ave");
      cy.get("[data-testid=APN]").type("1234567890");
      cy.get("#APN").then($element => {
        cy.wrap($element.val()).as("apn_number");
      });
      cy.get(".space-between").click();
      cy.get("#UNITS_CONDO").type("46");
      cy.get("#PARK_CONDO").type("92");
      cy.get(".space-between > :nth-child(2)").click();
      cy.get("#PARK_SPACES").type("88");
      cy.get(".space-between > :nth-child(2)").click();
      cy.findByLabelText("Bike Parking").click();
      cy.get("#STRATEGY_PARKING_1").select(
        "the cost of each parking space is $25/mo"
      );
      cy.findByLabelText("Reduced Parking Supply").select(
        "Reduces 25% of the parking spaces available relative to the  parking baseline"
      );
      cy.findByLabelText("Affordable Housing Level").select(
        "35% of State Density Bonus"
      );
      cy.get(".space-between > :nth-child(2)").click();
      cy.get(
        ".tdm-wizard-content-container.contentContainer-0-2-26 > div > div:nth-child(3) > span:nth-child(1)"
      ).should("have.text", "Barrington Condos");
      cy.get(
        ".tdm-wizard-content-container.contentContainer-0-2-26 > div > div:nth-child(3) > span:nth-child(2)"
      ).should("contain.text", "825 S. Barrington Ave");
      cy.get(
        ".tdm-wizard-content-container > div > div > div > div:nth-child(2) > span:nth-child(2)"
      ).then($projectDetailsAPN => {
        cy.get("@apn_number").then($projectWizardAPN => {
          expect($projectDetailsAPN.text()).to.equal($projectWizardAPN);
        });
      });

      cy.get("[data-testid='summary-project-level-value']").should(
        "have.text",
        "1"
      );
      cy.get("[data-testid='summary-parking-ratio-value']").then($ele => {
        expect($ele.text()).to.contain("95");
      });

      cy.get("[data-testid='summary-target-points-value']").then($ele => {
        expect($ele.text()).to.contain("15");
      });

      cy.get("[data-testid='summary-earned-points-value']").then($ele => {
        expect($ele.text()).to.contain("4");
      });
      cy.get(
        ".tdm-wizard-content-container > div > div:nth-child(5) > div > span"
      ).should("contain.text", "Residential");

      cy.get(
        ":nth-child(1) > .justify-content-center > .ruleText-0-2-207"
      ).should("have.text", "35% of State Density Bonus");
      cy.get(
        ".tdm-wizard-content-container > div > div:nth-child(6) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(1)"
      ).should("have.text", "2");

      cy.get(
        ":nth-child(2) > .justify-content-center > .ruleText-0-2-207"
      ).should("have.text", "the cost of each parking space is $25/mo");
      cy.get(
        ".tdm-wizard-content-container > div > div:nth-child(6) > div > div:nth-child(2) > div:nth-child(3) > div:nth-child(1)"
      ).should("have.text", "1");

      cy.get(
        ":nth-child(3) > .justify-content-center > .ruleText-0-2-207"
      ).should(
        "have.text",
        "Reduces 25% of the parking spaces available relative to the  parking baseline"
      );
      cy.get(
        ".tdm-wizard-content-container > div > div:nth-child(6) > div > div:nth-child(3) > div:nth-child(3) > div:nth-child(1)"
      ).should("have.text", "1");

      cy.get(
        ":nth-child(1) > .specificationDetailsContainer-0-2-205 > .measureDetails-0-2-202"
      ).should("have.text", "46");
      cy.get(
        ":nth-child(2) > .specificationDetailsContainer-0-2-205 > .measureDetails-0-2-202"
      ).should("have.text", "92");
      cy.get(
        ":nth-child(2) > .measuresContainer-0-2-200 > .rule-0-2-175 > .pointsContainer-0-2-206 > .value-0-2-178"
      ).should("have.text", "92");
      cy.get(
        ":nth-child(4) > .pointsContainer-0-2-206 > .value-0-2-178"
      ).should("have.text", "88");

      cy.get(".projectLevelValue-0-2-43").should("have.text", "1");
      cy.get(":nth-child(1) > .ruleValue-0-2-54").should("have.text", "15");
      cy.get(":nth-child(2) > .ruleValue-0-2-54").should("have.text", "4");
    });
  });
});
