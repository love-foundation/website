describe('Artist index page behavior', () => {
  beforeEach(() => {
    cy.visit('/artists')
    cy.wait(1000);
  });

  it('shuffles the artists on each page load', () => {
    let firstArtistName = cy.get('[data-cy=artistName]').first();
    cy.visit('/artists');
    cy.wait(1000);
    cy.get('[data-cy=artistName]').first().should('not', firstArtistName);
  });

  it('shuffles the artists when pressing the shuffle button', () => {
    let firstArtistName = cy.get('[data-cy=artistName]').first();
    cy.get('[data-cy=shuffleArtists]').click();
    cy.wait(1000);
    cy.get('[data-cy=artistName]').first().should('not', firstArtistName);
  });

  it('filters the artists when searching for a name', () => {
    cy.get('[data-cy=searchArtists]').type('Zebra Centauri');
    cy.wait(1000);
    cy.contains('[data-cy=artistName]', 'Zebra Centauri');
  });

  it('unfilters the artists when removing text from the search field for a name', () => {
    cy.get('[data-cy=searchArtists]').type('Zebra Centauri');
    cy.wait(1000);
    cy.contains('[data-cy=artistName]', 'Zebra Centauri');
    cy.get('[data-cy=searchArtists]').clear();
    cy.get('[data-cy=artistName]').first().should('not', 'Zebra Centauri');
  });

});
