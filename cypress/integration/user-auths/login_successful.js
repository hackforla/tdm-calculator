import "@testing-library/cypress/add-commands";

/// <reference types="cypress"/>

describe("Login successfully as an existing user", () => {
  it("finds and clicks the login menu item on home page", () => {
    cy.visit("/");
    cy.get(".btn-submit").click();
    cy.url().should("include", "/login");
  });
  describe("Login from /login", () => {
    it("logs in with valid credentials", () => {
      cy.visit("/login");

      cy.findByPlaceholderText("Email Address").type(
        "test_regular_user@dispostable.com"
      );
      cy.findByPlaceholderText("Password").type("Dogfood1");
      cy.get("form").findByText("Login").click();

      cy.url().should("include", "/calculation/1");
      cy.findByText("Hello, Test Regular User").should("be.visible");
    });
  });
});
