describe('Navigation with the navbar', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('opens the nav menu when clicking the burger', () => {
    cy.get('[data-cy=toggleNav]').click();
    cy.get('nav').should('exist');
  });

  it('closes the nav menu when clicking the burger again after it opened', () => {
    cy.get('[data-cy=toggleNav]').click();
    cy.get('nav').should('exist');
    cy.get('[data-cy=toggleNav]').click();
    cy.get('nav').should('not.exist');
  });

  it('opens the nav and navigates to the about page', () => {
    cy.get('[data-cy=toggleNav]').click();
    cy.get('nav').contains('about').click();
    cy.url().contains('/about');

  });

});
