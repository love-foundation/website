describe('Projects Page Functionality', () => {
	beforeEach(() => {
		cy.visit('/projects');
	});

	it('displays the projects page and has an introduction text', () => {
		cy.contains('[data-cy=pageTitle]', 'Projects');
		cy.contains(
			'[data-cy=pageIntro]',
			'Love Foundation is starting and supporting a variety of projects globally.'
		);
	});

	it('shows at least one project item', () => {
		cy.get('[data-cy=projectTitle]').first().should('exist');
		cy.get('[data-cy=projectPillar]').first().should('exist');
	});

	it('shows the project filters and there is five options', () => {
		cy.get('[data-cy=projectFilters]').should('exist');
		cy.get('[data-cy=projectFilter]').should('have.length', 5);
	});

	it('filters the projects when using one of the filter options', () => {
		cy.get('[data-cy=projectItem]').should('have.length', 7);
		cy.get('[data-cy=projectFilter]').first().click();
		cy.get('[data-cy=projectItem]').should('have.length.lt', 7);
	});

	it('changes the filter when clicking another category', () => {
		cy.get('[data-cy=projectItem]').should('have.length', 7);
		cy.get('[data-cy=projectFilter]').contains('Water for all').click().debug();

		cy.get('[data-cy=projectItem]').should('have.length', 4);
		cy.get('[data-cy=projectPillar]').should('have.class', 'water');
		cy.get('[data-cy=projectFilter]').contains('Community Spirit').click();
		cy.get('[data-cy=projectItem]').should('have.length', 2);
		cy.get('[data-cy=projectPillar]').should('have.class', 'community');
	});

	it('removes the filter when clicking the same category again', () => {
		cy.get('[data-cy=projectItem]').should('have.length', 7);
		cy.get('[data-cy=projectFilter]').first().click();
		cy.get('[data-cy=projectItem]').should('have.length.lt', 7);
		cy.get('[data-cy=projectFilter]').first().click();
	});

	it('filters the projects for water projects', () => {
		cy.get('[data-cy=projectItem]').should('have.length', 7);
		cy.get('[data-cy=projectFilter]').contains('Water for all').click();
		cy.get('[data-cy=projectItem]').should('have.length', 4);
		cy.get('[data-cy=projectPillar]').should('have.class', 'water');
	});

	it('filters the projects for community projects', () => {
		cy.get('[data-cy=projectItem]').should('have.length', 7);
		cy.get('[data-cy=projectFilter]').contains('Community Spirit').click();
		cy.get('[data-cy=projectItem]').should('have.length', 2);
		cy.get('[data-cy=projectPillar]').should('have.class', 'community');
	});

	it('filters the projects for sustainability projects', () => {
		cy.get('[data-cy=projectItem]').should('have.length', 7);
		cy.get('[data-cy=projectFilter]').contains('Shared Sustainability').click();
		cy.get('[data-cy=projectItem]').should('have.length', 0);
		cy.get('[data-cy=projectPillar]').should('have.class', 'sustainability');
	});

	it('filters the projects for joy projects', () => {
		cy.get('[data-cy=projectItem]').should('have.length', 7);
		cy.get('[data-cy=projectFilter]').contains('Joyful Purpose').click();
		cy.get('[data-cy=projectItem]').should('have.length', 1);
		cy.get('[data-cy=projectPillar]').should('have.class', 'joy');
	});

	it('filters the projects for love projects', () => {
		cy.get('[data-cy=projectItem]').should('have.length', 7);
		cy.get('[data-cy=projectFilter]').contains('Universal Love').click();
		cy.get('[data-cy=projectItem]').should('have.length', 0);
		cy.get('[data-cy=projectPillar]').should('have.class', 'love');
	});
});
