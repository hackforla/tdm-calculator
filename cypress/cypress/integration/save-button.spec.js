import "@testing-library/cypress/add-commands";

/// <reference types="cypress"/>

describe("Save Button", () => {
  beforeEach(() => {
    window.localStorage.setItem("termsAndConditions", "Accepted");
  });

  it("shows up disabled on every page when there are not changes", () => {
    cy.loginAs("ladot").then(cy.resetProjects);
    postNewProject().then((res) => {
      cy.visit("/projects");
      cy.findByText("Some Project Hotel").should("be.visible").click();

      cy.findByRole("button", { name: "Save Project" }).should("be.disabled");

      cy.goToNextPage();
      cy.findByRole("button", { name: "Save Project" }).should("be.disabled");

      cy.goToNextPage();
      cy.findByRole("button", { name: "Save Project" }).should("be.disabled");

      cy.goToNextPage();
      cy.findByRole("button", { name: "Save Project" }).should("be.disabled");

      cy.goToNextPage();
      cy.findByRole("button", { name: "Save Project" }).should("be.disabled");

      cy.goToNextPage();
      cy.findByRole("button", { name: "Save Project" }).should("be.disabled");
    });
  });

  it("shows up enabled on every page when there are changes", () => {
    cy.loginAs("ladot").then(cy.resetProjects);
    postNewProject().then((res) => {
      cy.visit("/projects");
      cy.findByText("Some Project Hotel").should("be.visible").click();

      cy.findByRole("textbox", { name: "Project Description" }).type("Description of project");
      cy.findByRole("button", { name: "Save Project" }).should("not.be.disabled");

      cy.goToNextPage();
      cy.findByRole("button", { name: "Save Project" }).should("not.be.disabled");

      cy.goToNextPage();
      cy.findByRole("button", { name: "Save Project" }).should("not.be.disabled");

      cy.goToNextPage();
      cy.findByRole("button", { name: "Save Project" }).should("not.be.disabled");

      cy.goToNextPage();
      cy.findByRole("button", { name: "Save Project" }).should("not.be.disabled");

      cy.goToNextPage();
      cy.findByRole("button", { name: "Save Project" }).should("not.be.disabled");
    });
  });

  it("hides save button for unauthenticated users", () => {
    cy.goToStart();
    fillProjectInfo(projectInfo);
    cy.findByRole("button", { name: "Save Project" }).should("not.exist");
    cy.goToNextPage(); // Go to Page 2
    fillProjectSpecifications(specs);
    cy.findByRole("button", { name: "Save Project" }).should("not.exist");
    cy.goToNextPage(); // Go to Page 3
    cy.get("#PARK_SPACES").type(calculate.parkingProvided);
    cy.findByRole("button", { name: "Save Project" }).should("not.exist");
    cy.goToNextPage(); // Go to Page 4
    cy.findByRole("button", { name: "Save Project" }).should("not.exist");
    cy.goToNextPage(); // Go to Page 5
    cy.findByRole("button", { name: "Save Project" }).should("not.exist");
  });
});

const postNewProject = () => {
  return cy.request({
    method: "POST",
    url: "http://localhost:5001/api/projects",
    body: {
      name: "Some Project Hotel",
      address: "12425 Hotel Bl.",
      formInputs:
        '{"PROJECT_NAME":"Some Project Hotel",\
        "PROJECT_ADDRESS":"12425 Victory Bl.",\
        "PROJECT_DESCRIPTION":"80-room four-story hotel.",\
        "APN":"1234-567-890",\
        "LAND_USE_HOTEL":true,\
        "UNITS_GUEST":"80",\
        "PARK_SPACES":"76",\
        "STRATEGY_HOV_3":true,\
        "STRATEGY_BIKE_4":true,\
        "STRATEGY_INFO_2":true}',
      calculationId: 1,
      dateCreated: "2020-11-12T00:38:42.763Z",
      dateModified: "2020-11-12T00:39:04.436Z",
      description: "80-room four-story hotel.",
      loginId: 37, // ladot
      firstName: "LA",
      lastName: "DOT",
    },
  });
};

const projectInfo = {
  name: "Save Button Flow",
  address: "123 S. Somewhere Ave",
  ain: "1234567890",
};

const specs = {
  habitableLessThan3: "10",
  habitable3: "10",
  habitableGreaterThan3: "10",
  condoUnits: "20",
  condoUnitsRequiredParking: "40",
  expectedLevelBefore: "2",
  expectedTargetPointsBefore: "20",
  expectedLevelAfterAffordableHousing: "1",
  expectedTargetPointsAfterAffordableHousing: "15",
};

const calculate = {
  parkingProvided: "115",
};

const fillProjectInfo = (projectInfo) => {
  // Project Info
  cy.get("#PROJECT_NAME").type(projectInfo.name);
  cy.get("#PROJECT_ADDRESS").type(projectInfo.address);
  cy.get("#APN").type(projectInfo.ain).type("/t");
};

const fillProjectSpecifications = (specs) => {
  // Specifications Page
  cy.get("#UNITS_HABIT_LT3").type(specs.habitableLessThan3);
  cy.get("#UNITS_HABIT_3").type(specs.habitable3);
  cy.get("#UNITS_HABIT_GT3").type(specs.habitableGreaterThan3);
  cy.get("#UNITS_CONDO").type(specs.condoUnits);
  cy.get("#PARK_CONDO").type(specs.condoUnitsRequiredParking);
};
