/// <reference types="cypress" />

describe("Duplicate Project Flow", () => {
  const postNewProject = () => {
    return cy.request({
      method: "POST",
      url: "http://localhost:5000/api/projects",
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

  beforeEach(() => {
    cy.loginAs("ladot").then(cy.resetProjects);

    cy.visit("/calculation");

    // Dismiss Terms and Conditions dialog
    cy.findByText("Accept").click();
    Cypress.Cookies.preserveOnce("jwt");
  });

  it("should duplicate a project with default name", () => {
    postNewProject().then((res) => {
      cy.visit("/projects");

      cy.findByText("Some Project Hotel").should("be.visible");

      cy.findByAltText(`Duplicate Project #${res.body.id} Icon`).click();

      cy.findByDisplayValue("Some Project Hotel (COPY)").should("be.visible");

      cy.findByRole("button", { name: "Create a Copy" }).click();

      cy.findByText("Some Project Hotel (COPY)").should("be.visible").click();

      // Check to see if form inputs copied over correctly
      cy.findByDisplayValue("Some Project Hotel (COPY)").should("be.visible");
      cy.findByDisplayValue("12425 Victory Bl.").should("be.visible");
      cy.goToNextPage();
      cy.findByDisplayValue("80").should("be.visible");
      cy.goToNextPage();
      cy.findByDisplayValue("76").should("be.visible");
      cy.goToNextPage();
      cy.goToNextPage();
      cy.get("#STRATEGY_BIKE_4").should("be.checked");
      cy.get("#STRATEGY_HOV_3").should("be.checked");
      cy.get("#STRATEGY_INFO_2").should("be.checked");
    });
  });

  it("should duplicate a project with updated name", () => {
    postNewProject().then((res) => {
      cy.visit("/projects");

      cy.findByText("Some Project Hotel").should("be.visible");

      cy.findByAltText(`Duplicate Project #${res.body.id} Icon`).click();

      cy.findByPlaceholderText("Name of Duplicated Project").clear().type("This is a new name for the duplicated project");

      cy.findByRole("button", { name: "Create a Copy" }).click();

      cy.findByText("This is a new name for the duplicated project").should("be.visible").click();

      // Check to see if form inputs copied over correctly
      cy.findByDisplayValue("This is a new name for the duplicated project").should("be.visible");
      cy.findByDisplayValue("12425 Victory Bl.").should("be.visible");
      cy.goToNextPage();
      cy.findByDisplayValue("80").should("be.visible");
      cy.goToNextPage();
      cy.findByDisplayValue("76").should("be.visible");
      cy.goToNextPage();
      cy.goToNextPage();
      cy.get("#STRATEGY_BIKE_4").should("be.checked");
      cy.get("#STRATEGY_HOV_3").should("be.checked");
      cy.get("#STRATEGY_INFO_2").should("be.checked");
    });
  });
});
