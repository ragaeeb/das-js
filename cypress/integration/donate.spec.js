describe('Donate', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.scrollTo('bottom');
    cy.scrollTo('bottom'); // need to do this twice due to lazy loading
  });

  it('should click PayPal button', () => {
    if (Cypress.$('[data-cy="paypal"]').length > 0) {
      cy.get('[data-cy="paypal"]').invoke('removeAttr', 'target').click({ force: true });
      cy.url().should('contain', 'paypal.com');
    }
  });
});
