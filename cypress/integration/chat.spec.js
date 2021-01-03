describe('Chat', () => {
  before(() => {
    cy.visit('/');
  });

  it('should click chat button', () => {
    cy.get('.woot--bubble-holder > :nth-child(1)').click({ force: true });
  });
});
