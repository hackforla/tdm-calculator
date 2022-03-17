import "@testing-library/cypress/add-commands";

/// <reference types="cypress"/>

describe("Navigate to Login Screen", () => {
  beforeEach(() => {
    window.localStorage.setItem("termsAndConditions", "Accepted");
  });

  it("finds and clicks the login menu item on home page", () => {
    cy.visit("/");
    cy.get("#cy-login-menu-item").click();
    cy.url().should("include", "/login");
  });
});

describe("Login from /login", () => {
  beforeEach(() => {
    window.localStorage.setItem("termsAndConditions", "Accepted");
  });

  it("logs in with valid credentials", () => {
    cy.visit("/login");
    cy.get("#cy-login-email").type("ladot@dispostable.com");
    cy.get("#cy-login-password").type("Dogfood1!");
    cy.get("form").get("#cy-login-submit").click();

    cy.url().should("include", "/calculation");
    cy.findByText("Hello, LA DOT");
  });
  it("blocks login with bad password", () => {
    cy.visit("/login");

    cy.get("#cy-login-email").type("ladot@dispostable.com");
    cy.get("#cy-login-password").type("Dogfood1");
    cy.get("form").get("#cy-login-submit").click();

    // Should stay on login page
    cy.url().should("include", "/login");
    // Should display error message
    cy.findByText("The password is incorrect, please check it and try again or use the Forgot Password feature.");
  });
  it("blocks login with bad email", () => {
    cy.visit("/login");

    cy.get("#cy-login-email").type("invalid@dispostable.com");
    cy.get("#cy-login-password").type("Dogfood1");
    cy.get("form").get("#cy-login-submit").click();

    // Should stay on login page
    cy.url().should("include", "/login");
    // Should display error message
    cy.findByText(
      "The email invalid@dispostable.com does not correspond to an existing account. Please verify the email or register as a new account."
    );
  });
  it("follows forgot password link", () => {
    cy.visit("/login");
    cy.get("form").get("#cy-login-nav-to-forgotpassword").click();

    // Should go to /forgotpassword page
    cy.url().should("include", "/forgotpassword");
  });
  it("follows register link", () => {
    cy.visit("/login");
    cy.get("#cy-login-nav-to-register").click();

    // Should go to /register page
    cy.url().should("include", "/register");
  });
});
