//Reference : https://github.com/testing-library/cypress-testing-library
import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />
describe("Barrington Condos", () => {
  context("project inputs", () => {
    it("enters project information - minimum requirements", () => {
      var projectName = "Barrington Condos";
      var projectNameAddress = "825 S. Barrington Ave";
      var projectID = "1234567890";
      var unitsCondo = "46";
      var parkCondo = "92";
      var parkSpaces = "88";
      var strategyParking = "the cost of each parking space is $25/mo";
      var reducedParkingSupply =
        "Reduces 25% of the parking spaces available relative to the  parking baseline";
      var affordableHousingLevel = "35% of State Density Bonus";
      var summaryProjectLevelValue = "1";
      var summaryParkingRatioValue = "95";
      var summaryTargetPointsValue = "1";
      var summaryEarnedPointsValue = "4";
      var landUsage = "Residential";
      var affordableHousingLevelPoints = "2";
      var strategyParkingPoints = "1";
      var reducedParkingSupplyPoints = "1";
      var dwellingUnits = "46";
      var enterParkingSpacesRequired = "92";
      var baselineParking = "92";
      var parkingProvided = "88";
      var projectLevel = "1";
      var targetPoints = "15";
      var earnedPoints = "4";

      cy.loginViaUIAs("test_regular_user@dispostable.com", "Dogfood1");

      cy.findByLabelText("Project Name").type(projectName);
      cy.findByLabelText("Address").type(projectNameAddress);
      cy.get("[data-testid=APN]").type(projectID);
      cy.get("#APN").then($apn_number => {
        cy.wrap($apn_number.val()).as("apn_number");
      });
      cy.get(".space-between").click();
      cy.get("#UNITS_CONDO").type(unitsCondo);
      cy.get("#PARK_CONDO").type(parkCondo);
      cy.get(".space-between > :nth-child(2)").click();
      cy.get("#PARK_SPACES").type(parkSpaces);
      cy.get(".space-between > :nth-child(2)").click();
      cy.findByLabelText("Bike Parking").click();
      cy.get("#STRATEGY_PARKING_1").select(strategyParking);
      cy.findByLabelText("Reduced Parking Supply").select(reducedParkingSupply);
      cy.findByLabelText("Affordable Housing Level").select(
        affordableHousingLevel
      );
      cy.get(".space-between > :nth-child(2)").click();
      cy.get(
        ".tdm-wizard-content-container.contentContainer-0-2-26 > div > div:nth-child(3) > span:nth-child(1)"
      ).should("have.text", projectName);
      cy.get(
        ".tdm-wizard-content-container.contentContainer-0-2-26 > div > div:nth-child(3) > span:nth-child(2)"
      ).should("contain.text", projectNameAddress);
      cy.get(
        ".tdm-wizard-content-container > div > div > div > div:nth-child(2) > span:nth-child(2)"
      ).then($projectDetailsAPN => {
        cy.get("@apn_number").then($projectWizardAPN => {
          expect($projectDetailsAPN.text()).to.equal($projectWizardAPN);
        });
      });
      cy.get("[data-testid='summary-project-level-value']").should(
        "have.text",
        summaryProjectLevelValue
      );
      cy.get("[data-testid='summary-parking-ratio-value']").then($sprv => {
        expect($sprv.text()).to.contain(summaryParkingRatioValue);
      });
      cy.get("[data-testid='summary-target-points-value']").then($stpv => {
        expect($stpv.text()).to.contain(summaryTargetPointsValue);
      });
      cy.get("[data-testid='summary-earned-points-value']").then($sepv => {
        expect($sepv.text()).to.contain(summaryEarnedPointsValue);
      });
      cy.get(
        ".tdm-wizard-content-container > div > div:nth-child(5) > div > span"
      ).should("contain.text", landUsage);
      cy.get(
        ":nth-child(1) > .justify-content-center > .ruleText-0-2-207"
      ).should("have.text", affordableHousingLevel);
      cy.get(
        ".tdm-wizard-content-container > div > div:nth-child(6) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(1)"
      ).should("have.text", affordableHousingLevelPoints);
      cy.get(
        ":nth-child(2) > .justify-content-center > .ruleText-0-2-207"
      ).should("have.text", strategyParking);
      cy.get(
        ".tdm-wizard-content-container > div > div:nth-child(6) > div > div:nth-child(2) > div:nth-child(3) > div:nth-child(1)"
      ).should("have.text", strategyParkingPoints);
      cy.get(
        ":nth-child(3) > .justify-content-center > .ruleText-0-2-207"
      ).should("have.text", reducedParkingSupply);
      cy.get(
        ".tdm-wizard-content-container > div > div:nth-child(6) > div > div:nth-child(3) > div:nth-child(3) > div:nth-child(1)"
      ).should("have.text", reducedParkingSupplyPoints);
      cy.get(
        ":nth-child(1) > .specificationDetailsContainer-0-2-205 > .measureDetails-0-2-202"
      ).should("have.text", dwellingUnits);
      cy.get(
        ":nth-child(2) > .specificationDetailsContainer-0-2-205 > .measureDetails-0-2-202"
      ).should("have.text", enterParkingSpacesRequired);
      cy.get(
        ":nth-child(2) > .measuresContainer-0-2-200 > .rule-0-2-175 > .pointsContainer-0-2-206 > .value-0-2-178"
      ).should("have.text", baselineParking);
      cy.get(
        ":nth-child(4) > .pointsContainer-0-2-206 > .value-0-2-178"
      ).should("have.text", parkingProvided);
      cy.get(".projectLevelValue-0-2-43").should("have.text", projectLevel);
      cy.get(":nth-child(1) > .ruleValue-0-2-54").should(
        "have.text",
        targetPoints
      );
      cy.get(":nth-child(2) > .ruleValue-0-2-54").should(
        "have.text",
        earnedPoints
      );
    });
  });
});
