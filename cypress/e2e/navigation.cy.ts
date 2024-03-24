describe('Navigation with the navbar', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.wait(1000);
	});

	it('opens the nav menu when clicking the burger', () => {
		cy.get('[data-cy=toggleNav]').click();
		cy.wait(1000);
		cy.get('nav').should('exist');
	});

	it('closes the nav menu when clicking the burger again after it opened', () => {
		cy.get('[data-cy=toggleNav]').click();
		cy.wait(1000);
		cy.get('nav').should('exist');
		cy.get('[data-cy=toggleNav]').click();
		cy.wait(1000);
		cy.get('nav').should('not.exist');
	});

	it('opens the nav and navigates to the about page', () => {
		cy.get('[data-cy=toggleNav]').click();
		cy.wait(1000);
		cy.get('nav').contains('About').click();
		cy.url().should('include', '/about');
	});

	it('opens the nav and navigates to the events page', () => {
		cy.get('[data-cy=toggleNav]').click();
		cy.wait(1000);
		cy.get('nav').contains('Events').click();
		cy.url().should('include', '/events');
		cy.contains('Events');
	});

	it('opens the nav and navigates to the Artists page', () => {
		cy.get('[data-cy=toggleNav]').click();
		cy.wait(1000);
		cy.get('nav').contains('Artists').click();
		cy.url().should('include', '/artists');
		cy.contains('Artists');
	});

	it('opens the nav and navigates to the Lovecasts page', () => {
		cy.get('[data-cy=toggleNav]').click();
		cy.wait(1000);
		cy.get('nav').contains('Lovecasts').click();
		cy.url().should('include', '/lovecasts');
		cy.contains('Lovecasts');
	});

	it('opens the nav and navigates to the Projects page', () => {
		cy.get('[data-cy=toggleNav]').click();
		cy.wait(1000);
		cy.get('nav').contains('Projects').click();
		cy.url().should('include', '/projects');
	});

	it('allows navigating to root when on another page', () => {
		cy.visit('/events');
		cy.wait(1000);
		cy.get('[data-cy=toggleNav]').click();
		cy.wait(1000);
		cy.get('nav').contains('Home').click();
		cy.url().should('eq', 'http://localhost:5173/');
		cy.contains('What is Love Foundation?');
	});
});
