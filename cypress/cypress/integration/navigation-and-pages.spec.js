/// <reference types="cypress" />

describe("terms and conditions", () => {
  beforeEach(() => {
    window.localStorage.removeItem("termsAndConditions");
  });

  it("accepts the terms and conditions dialog in calculation page", () => {
    cy.visit("/calculation");

    cy.findByText("Accept").click();

    cy.get("#PROJECT_NAME").type("User is now able to input information in form");
  });

  it("accepts the terms and conditions dialog on about page", () => {
    cy.visit("/about");

    cy.findByText("Accept").click();

    cy.findByText("About the TDM Calculator");
  });

  it("accepts the terms and conditions dialog on login page", () => {
    cy.visit("/login");

    cy.findByText("Accept").click();

    cy.findByText("Please sign into your account to save progress");
  });

  it("navigates and displays terms and conditions page", () => {
    window.localStorage.setItem("termsAndConditions", "Accepted");
    cy.visit("/login");

    cy.findByText("Terms and Conditions").click();

    cy.findByText("TDM Calculator User Terms and Conditions").should("be.visible");
  });
});

describe("navigation and pages", () => {
  beforeEach(() => {
    window.localStorage.setItem("termsAndConditions", "Accepted");
  });

  it("navigates to about page and displays release number", () => {
    cy.visit("/login");

    cy.findByText("About").click();

    cy.findByText(/About the TDM Calculator/i).should("be.visible");
    cy.findByText(/What does TDM mean?/i).should("be.visible");

    cy.findByText(/Release #: [0-9]+\.[0-9]+\.[0-9]+/).should("be.visible");
  });

  it("navigates to public comment page", () => {
    cy.visit("/login");

    cy.findByText("Public Comment").click();

    cy.findByText(/Public Comment Form/i).should("be.visible");
    cy.findByText("Submit").should("be.visible");
  });

  it("navigates to privacy policy page", () => {
    cy.visit("/login");

    cy.findByText("Privacy Policy").click();

    cy.findByText(/Overview/i).should("be.visible");
    cy.findByText(/The personal information we collect/i).should("be.visible");
  });

  it("navigates to login page", () => {
    cy.visit("/about");

    cy.findByText("Login").click();

    cy.findByText(/Please sign into your account to save progress/i).should("be.visible");
  });
});
