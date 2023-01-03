describe('Launch list', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('loads intial data from space x', () => {
    cy.get('[data-cy-id="launch-grid"]').find('> div').should('have.length', 9);
  });

  it('should be able to load more launch data', () => {
    cy.get('[data-cy-id="launch-grid"]').find('> div').should('have.length', 9);

    cy.intercept('GET', 'https://api.spacexdata.com/v3/launches?limit=9&offset=9').as('getLaunchData');

    cy.get('[data-cy-id="load-more"]').click();

    cy.wait('@getLaunchData').its('response.statusCode').should('eq', 200);

    cy.get('[data-cy-id="launch-grid"]').find('> div').should('have.length', 18);
  });
});

export {};
