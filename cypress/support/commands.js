// this will skip the login UI and instead login programmatically
Cypress.Commands.add("loginAs", userType => {
  const types = {
    regularUser: {
      email: "test_regular_user@dispostable.com",
      password: "Dogfood1"
    },
    admin: {
      email: "test_admin@dispostable.com",
      password: "Dogfood1"
    },
    securityAdmin: {
      email: "test_security_admin@dispostable.com",
      password: "Dogfood1"
    }
  };

  const userCredentials = types[userType];

  cy.request({
    method: "POST",
    url: "http://localhost:5000/api/accounts/login",
    body: userCredentials
  }).then(res => {
    window.localStorage.setItem("jwt", res.body.user.token);
  });
});

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
