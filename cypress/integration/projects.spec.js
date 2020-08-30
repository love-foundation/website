describe('Projects Page Functionality', () => {
  beforeEach(() => {
    cy.visit('/projects');
    cy.wait(500);
  });

  it('displays the projects page and has an introduction text', () => {
    cy.contains('[data-cy=pageTitle]', 'Projects');
    cy.wait(500);
    cy.contains('[data-cy=pageIntro]', 'Love Foundation is starting and supporting a variety of projects globally.');
  });

  it('shows at least one project item', () => {
    cy.get('[data-cy=projectTitle]').first().should('exist');
  });
});

