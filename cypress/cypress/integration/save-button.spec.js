import '@testing-library/cypress/add-commands';

/// <reference types="cypress"/>

describe('Save Button', () => {
  beforeEach(() => {
    window.localStorage.setItem('termsAndConditions', 'Accepted');
    cy.loginAs('ladot');

    cy.visit('/projects');
    cy.get('table').find('tr td a').first().click();
  });

  it('shows up disabled on every page when there are not changes', () => {
    cy.findByRole('button', { name: /Save Project/i }).should('be.disabled');
    cy.findByTestId('rightNavArrow').click();

    cy.findByRole('button', { name: 'Save Project' }).should('be.disabled');
    cy.findByTestId('rightNavArrow').click();

    cy.findByRole('button', { name: 'Save Project' }).should('be.disabled');
    cy.findByTestId('rightNavArrow').click();

    cy.findByRole('button', { name: 'Save Project' }).should('be.disabled');
    cy.findByTestId('rightNavArrow').click();

    cy.findByRole('button', { name: 'Save Project' }).should('be.disabled');
    cy.findByTestId('rightNavArrow').click();
  });
});
