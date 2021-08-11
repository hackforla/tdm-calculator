/// <reference types="cypress" />

describe("Reset Project No Auth", () => {
  beforeEach(() => {
    goToStart();
    fillProjectInfo(projectInfo);
    goToNextPage(); // Go to Page 2

    fillProjectSpecifications(specs);
  });

  it("from spec page", () => {
    resetProjectAndTest(checkProjectIsEmpty);
  });

  it("from Strategies page", () => {
    goToNextPage(); // Go to Page 3

    // Calculate TDM Target Points Page
    cy.get("#PARK_SPACES").type(calculate.parkingProvided);
    goToNextPage(); // Go to Page 4

    resetProjectAndTest(checkProjectIsEmpty);
  });

  it("cancel should not reset", () => {
    goToPreviousPage();
    makeChanges(projectInfoChanges);

    goToNextPage(); // Go to Page 2
    resetProjectCancelAndTest(testChangesAreNotUndone);
  });
});

describe("Reset Project with Auth", () => {
  beforeEach(() => {
    login();
    createProject(projectInfo, specs, calculate);

    goToProjects();
    loadProject(projectInfo);
  });

  it("with no change from spec page", () => {
    goToNextPage(); // Go to Page 2
    resetProjectAndTest(testProjectIsReloaded);
  });

  it("with change from spec page", () => {
    makeChanges(projectInfoChanges);

    goToNextPage(); // Go to Page 2
    resetProjectAndTest(testChangesAreReset);
  });

  it("cancel should not reset", () => {
    makeChanges(projectInfoChanges);

    goToNextPage(); // Go to Page 2
    resetProjectCancelAndTest(testChangesAreNotUndone);
  });
});

const projectInfo = {
  name: "Residental Flow",
  address: "123 S. Somewhere Ave",
  ain: "1234567890",
};

const projectInfoChanges = {
  address: "123 E Easy St",
  description: "This is a sample project for testing",
};

const projectInfoOriginal = {
  address: "123 S. Somewhere Ave",
  description: "",
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

const login = () => {
  cy.loginAs("ladot").then(cy.resetProjects);
  goToStart();

  //Cypress.Cookies.preserveOnce('jwt');
};

const goToStart = () => {
  cy.visit("/calculation");

  // Dismiss Terms and Conditions dialog
  cy.findByText("Accept")
    .click()
    .then(() => {
      cy.findByText("Accept").should("not.be.visible");
    });
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

const goToPreviousPage = () => {
  cy.findByTestId("leftNavArrow").click();
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

const resetProjectCancelAndTest = (test) => {
  cy.findByRole("button", { name: "Reset Project" }).click();
  cy.findByRole("button", { name: "Cancel" })
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

  cy.findByRole("button", { name: "Save Project" }).click();
};

const loadProject = (projectInfo) => {
  const project = cy.contains("a", projectInfo.name);
  project.click().then(() => {
    cy.url().should("contain", "/calculation/1");
  });
};

const makeChanges = (projectInfo) => {
  cy.get("#PROJECT_ADDRESS").clear().type(projectInfo.address);
  cy.get("#PROJECT_DESCRIPTION").clear().type(projectInfo.description);
};

const testChanges = (projectInfo) => {
  cy.get("#PROJECT_ADDRESS").should("have.value", projectInfo.address);
  cy.get("#PROJECT_DESCRIPTION").should("have.value", projectInfo.description);
};

const testProjectIsReloaded = () => {
  checkProjectInfo(projectInfo);
  goToNextPage(); // Go to Page 2
  checkProjectSpecifications(specs);
};

const testChangesAreUndone = () => {
  // check that the inputs are reverted to their previous states
  testChanges(projectInfoOriginal);
};

const testChangesAreNotUndone = () => {
  goToPreviousPage(); // go back to first page before calling the next code

  // check that the inputs are not reverted to their previous states
  testChanges(projectInfoChanges);
};

const testChangesAreReset = () => {
  testProjectIsReloaded();

  goToPreviousPage(); // go back to first page before calling the next code
  testChangesAreUndone();
};
