//Reference : https://github.com/testing-library/cypress-testing-library
import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />
describe("Create, Read, and Update a Project as a Regular User", () => {
  beforeEach(() => {
    cy.loginAs("regularUser").then(cy.resetProjects);
    cy.visit("/");
    cy.findAllByText("New Project").click();
    cy.findByText("Hello, Test Regular User").should("be.visible");
    Cypress.Cookies.preserveOnce("jwt");
  });
  it("creates and saves a new project", () => {
    inputNewProjectData();

    cy.findByText("Save As New Project").click();
    cy.findByText("Saved New Project").should("be.visible");

    cy.findByText("Projects").click();
    cy.findByText("Cypress Barrington Condos");
  });

  it("displays existing project and updates it", () => {
    postNewProject();

    cy.visit("/projects");
    cy.findAllByText("Cypress Victory Hotel")
      .should("be.visible")
      .click();

    cy.findByLabelText("Project Name").type(" Updated");
    cy.findByLabelText("Version #").type("v2");
    cy.findByTestId(">").click();
    cy.findByTestId(">").click();
    cy.findByTestId(">").click();
    cy.findByTestId(">").click();
    cy.findByLabelText("Bike Share Station").click();
    cy.findByTestId(">").click();
    cy.findByText("Save Project Changes").click();
    cy.findByText("Saved Project Changes").should("be.visible");

    cy.visit("/projects");
    cy.findByText("Cypress Victory Hotel Updated").should("be.visible");
    cy.findByText("v2").should("be.visible");
  });

  //TODO: Add delete workflow when delete ui gets developed

  const inputNewProjectData = () => {
    cy.findByLabelText("Project Name").type("Cypress Barrington Condos");
    cy.findByLabelText("Address").type("825 S. Barrington Ave");
    cy.findByTestId(">").click();
    cy.findByLabelText("Residential").click();
    cy.findByTestId(">").click();
    cy.findByLabelText("Condo - Units").type("46");
    cy.findByLabelText("Condo - Enter Parking Space Req'd").type("92");
    cy.findByTestId(">").click();
    cy.findByLabelText("Parking Provided").type("88");
    cy.findByText("92 spcs").should("exist");
    cy.findByText("95.65 %").should("exist");
    cy.findByTestId(">").click();
    cy.findByLabelText("Bike Parking").click();
    cy.findByLabelText("Pricing/Unbundling").click();
    cy.findByLabelText("Reduced Parking Supply").click();
    cy.findByLabelText("Affordable Housing Level").select(
      "35% of State Density Bonus"
    );
    cy.findByTestId(">").click();
  };

  const postNewProject = () => {
    cy.request({
      method: "POST",
      url: "http://localhost:5000/api/projects",
      body: {
        name: "Cypress Victory Hotel",
        address: "12425 Victory Bl.",
        formInputs:
          "{\"UNITS_GUEST\":\"80\",\"STRATEGY_BIKE_5\":true,\"STRATEGY_CAR_SHARE_1\":true,\"STRATEGY_HOV_1\":true,\"STRATEGY_HOV_3\":true,\"PROJECT_NAME\":\"Cypress Victory Hotel\",\"PROJECT_ADDRESS\":\"12425 Victory Bl.\",\"PROJECT_DESCRIPTION\":\"80-room four-story hotel. Spreadsheet has parkingcalc error.\",\"LAND_USE_HOTEL\":true,\"PARK_SPACES\":\"76\",\"STRATEGY_ACCESS_1\":\"25\",\"STRATEGY_BIKE_4\":true,\"STRATEGY_INFO_1\":true,\"STRATEGY_INFO_2\":true,\"STRATEGY_INFO_3\":true,\"STRATEGY_TRANSIT_ACCESS_3\":\"25\"}",
        loginId: 61,
        calculationId: 1,
        description: "80-room four-story hotel.",
        firstName: "Test Regular",
        lastName: "User"
      }
    });
  };
});
