const social = (key, url) =>
  it(`should click ${key} social link`, () => {
    if (Cypress.$(`[data-cy="${key}"]`).length > 0) {
      cy.get(`[data-cy="${key}"]`).invoke('removeAttr', 'target').click({ force: true });
      cy.url().should('include', url);
    }
  });

describe('Footer', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.scrollTo('bottom');
    cy.scrollTo('bottom'); // need to do this twice due to lazy loading
  });

  describe('Social Links', () => {
    social('instagram', 'instagram.com/');
    social('soundcloud', 'soundcloud.com/');
    social('facebook', 'facebook.com/');
    social('twitter', 'twitter.com');
    social('youtube', 'youtube.com/');
  });

  describe('Git Timestamp', () => {
    it('should click git hash', () => {
      cy.get('[data-cy="git"]').invoke('removeAttr', 'target').click({ force: true });
      cy.url().should('include', 'github.com');
    });
  });

  it('should click Privacy Policy link', () => {
    cy.get('[data-cy="privacy"]').click({ force: true });
    cy.title().should('include', 'Privacy Policy');
  });
});
