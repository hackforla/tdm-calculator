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
  Cypress.Cookies.debug(true);
  cy.visit("/");

  cy.request({
    method: "POST",
    url: "http://tdmdev.azurewebsites.net/api/accounts/login",
    body: userCredentials
  }).then(loginResponse => {
    //TODO: check implementation if there's a better way to set localstorage. see setLoggedInAccount
    localStorage.setItem(
      "currentUser",
      JSON.stringify(loginResponse.body.user)
    );
  });
});

Cypress.Commands.add("logout", () => {
  cy.window().its("localStorage").invoke("removeItem", "jwt");
  cy.visit("/login");
});

Cypress.Commands.add("resetProjects", loginResponse => {
  const cookie = loginResponse.body.token;
  cy.request({
    method: "GET",
    url: "http://localhost:5000/api/projects",
    auth: {
      bearer: cookie
    }
  }).then(projectResponse => {
    const projects = projectResponse.body;
    if (projects.length > 0) {
      projects.map(project => {
        cy.request({
          method: "DELETE",
          url: `http://localhost:5000/api/projects/${project.id}`,
          auth: {
            bearer: cookie
          }
        });
      });
    }
  });
});

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false
});

Cypress.Commands.add("loginViaUIAs", (username, password) => {
  cy.visit("/");
  cy.get(":nth-child(1) > .form-control").type(username);
  cy.get(":nth-child(2) > .form-control").type(password);
  cy.get(".btn-submit").click();
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
