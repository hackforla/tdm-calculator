/// <reference types="cypress" />
//import { screen } from '@testing-library/react';

const projectInfo = {
  name: "Residental Flow",
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
  expectedLevel: "1",
  expectedTargetPoints: "21",
  expectedCityParkingBaseline: "85",
  expectedParkingRatioBaseline: "135.29",
};

const bonusPackage = {
  expectedPageText: "You qualify for a bonus package!",
  expectedPackage: "Residential Package",
};

const strategies = {
  affordableHousingLevel: "20% of State Density Bonus",
  reducedParkingSupply: "Reduces 50%-74% of spaces available",
  expectedEarnedPoints: "21",
};

const summary = {
  expectedAIN: "1234-567-890",
  expectedLevel: calculate.expectedLevel,
  expectedTargetPoints: calculate.expectedTargetPoints,
  expectedEarnedPoints: strategies.expectedEarnedPoints,
  expectedParkingRatioBaseline: `${Math.floor(
    calculate.expectedParkingRatioBaseline
  )}%`,
};

const login = () => {
  cy.loginAs("ladot");

  cy.visit("/calculation");

  // Dismiss Terms and Conditions dialog
  cy.findByText("Accept").click();

  //Cypress.Cookies.preserveOnce('jwt');
};

const goToStart = () => {
  cy.visit("/calculation");

  // Dismiss Terms and Conditions dialog
  cy.findByText("Accept").click();
};

const goToProjects = () => {
  cy.findByText("My Projects")
    .click()
    .then(() => {
      cy.url().should("contain", "/projects");
    });
};

const goToNextPage = () => {
  cy.findByTestId("rightNavArrow").click();
};

const loadFirstProject = () => {
  //cy.contains('a', 'Cypress Vicory Hotel');
  cy.get("table")
    .find("tr")
    .eq(1)
    .find("td")
    .eq(0)
    .click()
    .then(() => {
      cy.url().should("contain", "/calculation/1");
    });
};

const fillProjectInfo = (projectInfo) => {
  // Project Info
  cy.get("#PROJECT_NAME").type(projectInfo.name);
  cy.get("#PROJECT_ADDRESS").type(projectInfo.address);
  cy.get("#APN").type(projectInfo.ain);
};

const checkProjectInfo = (projectInfo) => {
  cy.get("#PROJECT_NAME").should("have.value", projectInfo.name);
  cy.get("#PROJECT_ADDRESS").should("have.value", projectInfo.address);
  cy.get("#APN").then(($input) => {
    const processed = $input.attr("value").split("-").join("");
    cy.wrap(processed).should("eq", projectInfo.ain);
  });
};

const fillProjectSpecifications = (specs) => {
  // Specifications Page - Residental
  cy.get("#UNITS_HABIT_LT3").type(specs.habitableLessThan3);
  cy.get("#UNITS_HABIT_3").type(specs.habitable3);
  cy.get("#UNITS_HABIT_GT3").type(specs.habitableGreaterThan3);
  cy.get("#UNITS_CONDO").type(specs.condoUnits);
  cy.get("#PARK_CONDO").type(specs.condoUnitsRequiredParking);
};

const checkProjectSpecifications = (specs) => {
  cy.get("#UNITS_HABIT_LT3").should("have.value", specs.habitableLessThan3);
  cy.get("#UNITS_HABIT_3").should("have.value", specs.habitable3);
  cy.get("#UNITS_HABIT_GT3").should("have.value", specs.habitableGreaterThan3);
  cy.get("#UNITS_CONDO").should("have.value", specs.condoUnits);
  cy.get("#PARK_CONDO").should("have.value", specs.condoUnitsRequiredParking);
};

const checkProjectIsEmpty = () => {
  cy.location("pathname").should("contain", "/calculation/1");
  cy.findByRole("textbox", { name: "Project Name" }).should("have.value", "");
  cy.findByRole("textbox", { name: "Address" }).should("have.value", "");
  cy.findByRole("textbox", { name: /^AIN\/APN/ }).should("have.value", "");
};

const resetProjectAndTest = (test) => {
  cy.findByRole("button", { name: "Reset Project" }).click();
  cy.findByRole("button", { name: "Proceed" })
    .click()
    .then(() => {
      test();
    });
};

const createProject = (projectInfo, specs, calculate) => {
  fillProjectInfo(projectInfo);
  goToNextPage(); // Go to Page 2

  fillProjectSpecifications(specs);
  goToNextPage(); // Go to Page 3

  // Calculate TDM Target Points Page
  cy.get("#PARK_SPACES").type(calculate.parkingProvided);
  //goToNextPage(); // Go to Page 4

  cy.findByRole("button", { name: "Save Project" }).click();
};

const loadProject = (projectInfo) => {
  const project = cy.contains("a", projectInfo.name);
  project.click().then(() => {
    cy.url().should("contain", "/calculation/1");
  });
};

const makeChanges = () => {};

const resetProject = () => {};

const testChangesAreReset = () => {
  checkProjectInfo(projectInfo);
  goToNextPage(); // Go to Page 2
  checkProjectSpecifications(specs);
};

describe("Reset Project", () => {
  it("Reset project from spec page no auth", () => {
    goToStart();
    fillProjectInfo(projectInfo);
    goToNextPage(); // Go to Page 2

    fillProjectSpecifications(specs);
    resetProjectAndTest(checkProjectIsEmpty);
  });

  it("Reset project from Strategies page no auth", () => {
    goToStart();
    fillProjectInfo(projectInfo);
    goToNextPage(); // Go to Page 2

    fillProjectSpecifications(specs);
    goToNextPage(); // Go to Page 3

    // Calculate TDM Target Points Page
    cy.get("#PARK_SPACES").type(calculate.parkingProvided);
    goToNextPage(); // Go to Page 4

    resetProjectAndTest(checkProjectIsEmpty);
  });

  it("Reset project from spec page with auth", () => {
    cy.loginAs("ladot").then(cy.resetProjects);
    goToStart();
    createProject(projectInfo, specs, calculate);

    goToProjects();
    loadProject(projectInfo);
    makeChanges();
    resetProject();
    testChangesAreReset();
    return;

    //loadFirstProject();
    goToNextPage(); // Go to Page 2

    resetProjectAndTest("cypress test", projectInfo, specs, calculate);
  });

  it.skip("Reset project from Strategies page with auth", () => {
    login();
    goToProjects();

    loadFirstProject();
    goToNextPage(); // Go to Page 2

    fillProjectSpecifications(specs);
    goToNextPage(); // Go to Page 3

    // Calculate TDM Target Points Page
    cy.get("#PARK_SPACES").type(calculate.parkingProvided);
    goToNextPage(); // Go to Page 4

    resetProjectAndTest(checkProjectIsEmpty);
  });
});
