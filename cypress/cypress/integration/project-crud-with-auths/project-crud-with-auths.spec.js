//Reference : https://github.com/testing-library/cypress-testing-library
import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />
describe("Create, Read, and Update a Project as a Regular User", () => {
  beforeEach(() => {
    cy.loginAs("ladot").then(cy.resetProjects); //TODO: switch out ladot with regular user with no admin access; maybe data/migration for regular user?

    cy.visit("/calculation");

    // Dismiss Terms and Conditions dialog
    cy.findByText("Accept").click();

    cy.findAllByText("Create Project").click();
    cy.findByText("Hello, LA DOT").should("be.visible");
    Cypress.Cookies.preserveOnce("jwt");
  });

  it("creates and saves a new project", () => {
    inputNewProjectData();

    cy.findByRole("button", { name: "Save Project" }).click();

    // The expected toast behavior is still TBD
    cy.findByText("Saved New Project").should("be.visible");

    cy.findByText("My Projects").click();
    cy.findByText("Cypress Test Project");
  });

  it("displays existing project and updates it", () => {
    postNewProject().then((res) => {
      cy.visit("/projects");
      cy.findAllByText("Cypress Victory Hotel").should("be.visible").click();

      cy.findByTestId("PROJECT_NAME").type(" Updated");
      cy.findByTestId("VERSION_NO").type("v2");
      cy.findByTestId("rightNavArrow").click();
      cy.findByTestId("rightNavArrow").click();
      cy.findByTestId("rightNavArrow").click();
      cy.get("#STRATEGY_BIKE_2").click();
      cy.findByTestId("rightNavArrow").click();
      cy.findByRole("button", { name: "Save Project" }).click();

      // Expected toast behavior is TBD
      cy.findByText("Saved Project Changes").should("be.visible");

      cy.visit("/projects");
      cy.findByText("Cypress Victory Hotel Updated").should("be.visible");
      cy.findByText("v2").should("be.visible");
    });
  });

  it("deletes existing project", () => {
    postNewProject().then((response) => {
      cy.visit("/projects");
      cy.findAllByText("Cypress Victory Hotel").should("be.visible");

      // find delete icon and click to open modal
      cy.findByRole("button", {
        name: `Delete Project #${response.body.id}`,
      }).click();

      // click delete button inside modal
      cy.findByRole("button", { name: "Delete" }).click();

      // TODO: user should not have to refresh page to see change; remove next line when this is fixed
      cy.visit("/projects");

      cy.findByText("Cypress Victory Hotel").should("not.exist");
    });
  });

  /// Add minimal project
  const inputNewProjectData = () => {
    cy.get("#PROJECT_NAME").type("Cypress Test Project");
    cy.findByTestId("PROJECT_ADDRESS").type("220 W. Garden Path");
    cy.findByTestId("APN").type("999999999");
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
    return cy.request({
      method: "POST",
      url: "http://localhost:5000/api/projects",
      body: {
        name: "Cypress Victory Hotel",
        address: "12425 Victory Bl.",
        formInputs:
          '{"UNITS_GUEST":"80","STRATEGY_BIKE_5":true,"STRATEGY_CAR_SHARE_1":true,"STRATEGY_HOV_1":true,"STRATEGY_HOV_3":true,"PROJECT_NAME":"Cypress Victory Hotel","PROJECT_ADDRESS":"12425 Victory Bl.","PROJECT_DESCRIPTION":"80-room four-story hotel. Spreadsheet has parkingcalc error.","LAND_USE_HOTEL":true,"PARK_SPACES":"76","STRATEGY_ACCESS_1":"25","STRATEGY_BIKE_4":true,"STRATEGY_INFO_1":true,"STRATEGY_INFO_2":true,"STRATEGY_INFO_3":true,"STRATEGY_TRANSIT_ACCESS_3":"25","APN":"1234-567-890"}',
        calculationId: 1,
        dateCreated: "2020-11-12T00:38:42.763Z",
        dateModified: "2020-11-12T00:39:04.436Z",
        description:
          "80-room four-story hotel. Spreadsheet has parkingcalc error.",
        loginId: 37, // ladot
        firstName: "LA",
        lastName: "DOT",
        // loginId: 61, // regular user
        // firstName: "Test Regular",
        // lastName: "User"
      },
    });
  };
});
