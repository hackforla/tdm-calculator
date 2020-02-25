import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />

// cy.configureCypressTestingLibrary(config)

context("Actions", () => {
  // beforeEach(() => {
  //   cy.visit('http://localhost:3000/')
  // })

  // https://on.cypress.io/interacting-with-elements

  // describe('barrington condos')
  it("enters project information - minimum requirements", () => {
    cy.visit("http://localhost:3000/");

    cy.findAllByText("New Project").click();
    cy.findByTestId("Project Name").type("Barrington Condos");
    cy.findByTestId("Address").type("825 S. Barrington Ave");
    // cy.findByTestId('Project Description').type('46 Unit Condo Complex')
    cy.findAllByText(">").click();
  });

  it("selects development type", () => {
    cy.findByTestId("Residential").click();
    cy.findAllByText(">").click();
  });

  it("enters information for selected development type(s)", () => {
    cy.findByTestId(/Condo - Units/i).type("46");
    cy.findByTestId(/Condo - Enter Parking Space Req'd/i).type("92");
    cy.findByTestId(">").click();
  });

  it("enters in number of parking spaces", async () => {
    await cy.findByTestId(/Parking Provided/i).type("88");
  });
});
