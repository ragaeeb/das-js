describe('Contact', () => {
  before(() => {
    cy.visit('/');
    cy.scrollTo('bottom');
    cy.scrollTo('bottom'); // need to do this twice due to lazy loading
  });

  it('should click Mailing List button', () => {
    cy.get('[data-cy="newsletter"]').click({ force: true });
    cy.title().should('include', 'Mailing List');
  });
});
