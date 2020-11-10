//Reference : https://github.com/testing-library/cypress-testing-library
import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />
describe("Create, Read, and Update a Project as a Regular User", () => {
  beforeEach(() => {
    cy.loginAs("ladot").then(cy.resetProjects);
    cy.visit("/calculation");

    // Dismiss Terms and Conditions dialog
    cy.findByText("Accept").click();

    cy.findAllByText("Create Project").click();
    cy.findByText("Hello, LA DOT").should("be.visible");
    Cypress.Cookies.preserveOnce("jwt");
  });
  it("creates and saves a new project", () => {
    inputNewProjectData();

    cy.findByText("SAVE PROJECT").click();

    // The expected behavior beyond this point
    // is still TBD
    // cy.findByText("Saved New Project").should("be.visible");

    // cy.findByText("Projects").click();
    // cy.findByText("Cypress Barrington Condos");
  });

  it("displays existing project and updates it", () => {
    postNewProject();

    cy.visit("/projects");
    cy.findAllByText("Cypress Victory Hotel").should("be.visible").click();

    cy.findByLabelText("Project Name").type(" Updated");
    cy.findByLabelText("Version #").type("v2");
    cy.findByTestId("rightNavArrow").click();
    cy.findByTestId("rightNavArrow").click();
    cy.findByTestId("rightNavArrow").click();
    cy.findByLabelText("Bike Share Station").click();
    cy.findByTestId("rightNavArrow").click();
    cy.findByText("Save Project Changes").click();

    // Expected behavior beyond this point is TBD
    // cy.findByText("Saved Project Changes").should("be.visible");

    // cy.visit("/projects");
    // cy.findByText("Cypress Victory Hotel Updated").should("be.visible");
    // cy.findByText("v2").should("be.visible");
  });

  //TODO: Add delete workflow when delete ui gets developed

  /// Add minimal project
  const inputNewProjectData = () => {
    cy.get("#PROJECT_NAME").type("Cypress Test Project");
    cy.findByTestId("PROJECT_ADDRESS").type("220 W. Garden Path");
    cy.findByTestId("APN").type("9999999999");
    cy.findByTestId("PROJECT_DESCRIPTION").type("Cypress Test Project");

    // Advance to specifications page
    cy.findByTestId("rightNavArrow").click();

    cy.findByTestId("UNITS_HABIT_GT3").type("150");

    // Advance to Target Points Page
    // (Should skip Package Page, since Level 3)
    cy.findByTestId("rightNavArrow").click();

    cy.findByTestId("PARK_SPACES").type("300");

    // Advance to Strategies
    cy.findByTestId("rightNavArrow").click();

    // Advance to Summary Page
    cy.findByTestId("rightNavArrow").click();
  };

  const postNewProject = () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/projects",
      body: {
        name: "Cypress Victory Hotel",
        address: "12425 Victory Bl.",
        formInputs:
          '{"UNITS_GUEST":"80","STRATEGY_BIKE_5":true,"STRATEGY_CAR_SHARE_1":true,"STRATEGY_HOV_1":true,"STRATEGY_HOV_3":true,"PROJECT_NAME":"Cypress Victory Hotel","PROJECT_ADDRESS":"12425 Victory Bl.","PROJECT_DESCRIPTION":"80-room four-story hotel. Spreadsheet has parkingcalc error.","LAND_USE_HOTEL":true,"PARK_SPACES":"76","STRATEGY_ACCESS_1":"25","STRATEGY_BIKE_4":true,"STRATEGY_INFO_1":true,"STRATEGY_INFO_2":true,"STRATEGY_INFO_3":true,"STRATEGY_TRANSIT_ACCESS_3":"25"}',
        loginId: 61,
        calculationId: 1,
        description: "80-room four-story hotel.",
        firstName: "Test Regular",
        lastName: "User"
      }
    });
  };
});
