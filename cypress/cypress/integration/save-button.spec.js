import '@testing-library/cypress/add-commands';

/// <reference types="cypress"/>

describe('Save Button', () => {
  const postNewProject = () => {
    return cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/projects',
      body: {
        name: 'Some Project Hotel',
        address: '12425 Hotel Bl.',
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
        dateCreated: '2020-11-12T00:38:42.763Z',
        dateModified: '2020-11-12T00:39:04.436Z',
        description: '80-room four-story hotel.',
        loginId: 37, // ladot
        firstName: 'LA',
        lastName: 'DOT',
      },
    });
  };

  beforeEach(() => {
    window.localStorage.setItem('termsAndConditions', 'Accepted');
    cy.loginAs('ladot').then(cy.resetProjects);
  });

  it('shows up disabled on every page when there are not changes', () => {
    postNewProject().then((res) => {
      cy.visit('/projects');
      cy.findByText('Some Project Hotel').should('be.visible').click();

      cy.findByRole('button', { name: 'Save Project' }).should('be.disabled');

      cy.findByTestId('rightNavArrow').click();
      cy.findByRole('button', { name: 'Save Project' }).should('be.disabled');

      cy.findByTestId('rightNavArrow').click();
      cy.findByRole('button', { name: 'Save Project' }).should('be.disabled');

      cy.findByTestId('rightNavArrow').click();
      cy.findByRole('button', { name: 'Save Project' }).should('be.disabled');

      cy.findByTestId('rightNavArrow').click();
      cy.findByRole('button', { name: 'Save Project' }).should('be.disabled');

      cy.findByTestId('rightNavArrow').click();
      cy.findByRole('button', { name: 'Save Project' }).should('be.disabled');
    });
  });

  it('shows up not disabled on every page when there are changes', () => {
    postNewProject().then((res) => {
      cy.visit('/projects');
      cy.findByText('Some Project Hotel').should('be.visible').click();

      cy.findByRole('textbox', { name: 'Project Description' }).type(
        'Description of project'
      );
      cy.findByRole('button', { name: 'Save Project' }).should(
        'not.be.disabled'
      );

      cy.findByTestId('rightNavArrow').click();
      cy.findByRole('button', { name: 'Save Project' }).should(
        'not.be.disabled'
      );

      cy.findByTestId('rightNavArrow').click();
      cy.findByRole('button', { name: 'Save Project' }).should(
        'not.be.disabled'
      );

      cy.findByTestId('rightNavArrow').click();
      cy.findByRole('button', { name: 'Save Project' }).should(
        'not.be.disabled'
      );

      cy.findByTestId('rightNavArrow').click();
      cy.findByRole('button', { name: 'Save Project' }).should(
        'not.be.disabled'
      );

      cy.findByTestId('rightNavArrow').click();
      cy.findByRole('button', { name: 'Save Project' }).should(
        'not.be.disabled'
      );
    });
  });
});
