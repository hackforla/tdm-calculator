import "@testing-library/cypress/add-commands";

/// <reference types="cypress"/>
describe("Login unsuccessfully", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });
  it("requires email if user clicks submit without providing email address", () => {
    cy.get("form")
      .findByText("Login")
      .click();
    cy.findByText("Email is required").should("exist");
  });

  it("requires password if user clicks enter without providing password", () => {
    cy.findByPlaceholderText("Email Address").type(
      "some_valid_email@test.com{enter}"
    );
    cy.findByText("Password is required").should("exist");
  });

  it("requires minimum of 8 characters", () => {
    cy.findByPlaceholderText("Password").type("XXX{enter}");
    cy.findByText("Password must be 8 characters at minimum").should("exist");
  });

  it("requires correct password", () => {
    cy.findByPlaceholderText("Email Address").type(
      "test_regular_user@dispostable.com"
    );
    cy.findByPlaceholderText("Password").type("someWrongPassword{enter}");

    cy.findByText(
      "The password is incorrect, please check it and try again or use the Forgot Password feature."
    ).should("exist");
  });

  it.only("requires correct email format", () => {
    cy.findByPlaceholderText("Email Address").type("some_email_address.com");
    cy.findByPlaceholderText("Password").type("someValidPassword{enter}");

    cy.findByText("Invalid email address format").should("exist");
  });
});

// TODO:
// Edge cases like locked / deleted accounts
// Login but have not verified account
