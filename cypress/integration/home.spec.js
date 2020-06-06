describe('Timings', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy="gregorian"]').as('gregorian');
    cy.get('[data-cy="hijri"]').as('hijri');
  });

  it('should show the correct gregorian date', () => {
    cy.get('@gregorian')
      .invoke('text')
      .should('contain', new Date().getDate().toString())
      .and('contain', new Date().getFullYear().toString());
  });

  it('should show the correct hijri date', () => {
    cy.get('@hijri')
      .invoke('text')
      .should('match', /144\d{1} H/);
  });

  it('should show the prayer timings', () => {
    cy.get('.hero-title')
      .invoke('text')
      .should(
        'match',
        /Fajr \d{1,2}:\d{2} AMSunrise \d{1,2}:\d{2} AMDhuhr \d{1,2}:\d{2} [AP]MʿAṣr \d{1,2}:\d{2} PMMaġrib \d{1,2}:\d{2} PMʿIshāʾ \d{1,2}:\d{2} PM1\/2 Night Begins \d{1,2}:\d{2} [AP]MLast 1\/3 Night Begins \d{1,2}:\d{2} [AP]M/
      );
  });
});
