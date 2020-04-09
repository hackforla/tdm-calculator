import "@testing-library/cypress/add-commands";

/// <reference types="cypress"/>

describe("Login successfully as an existing user", () => {
  it("finds and clicks the login menu item on home page", () => {
    cy.visit("/");
    cy.findByText("Login").click();
    cy.url().should("include", "/login");
  });
  describe("Login from /login", () => {
    before(() => {
      cy.visit("http://localhost:3000/login");
      cy.clearCookies();
    });

    it("greets with sign in message", () => {
      cy.findByText("Welcome to Los Angeles’ TDM Calculator");
      cy.findByText("Please sign into your account to save progress.");
    });

    it("links to /register", () => {
      cy.findByText("Create an account").should(
        "have.attr",
        "href",
        "/register"
      );
    });

    it("enters valid credentials and clicks login button to submit form", () => {
      cy.findByPlaceholderText("Email Address").type(
        "test_regular_user@dispostable.com"
      );
      cy.findByPlaceholderText("Password").type("Dogfood1");
      cy.get("form")
        .findByText("Login")
        .click();
    });
    it("sets authorization cookie upon successful login", () => {
      cy.server();
      cy.route("/api/calculations/1/rules").as("getCalculationRules");
      cy.wait("@getCalculationRules");

      cy.getCookie("jwt").should("exist");
    });

    it("navigates to /calculation upon successful login", () => {
      cy.url().should("include", "/calculation/1");
    });
    it("greets user upon successful login", () => {
      cy.findByText("Hello, Test Regular User").should("be.visible");
    });
  });
});
