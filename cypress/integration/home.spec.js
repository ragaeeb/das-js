const buildDiffTest = (field, button) => {
  cy.get(field)
    .invoke('text')
    .then(($current) => {
      cy.get(button).click();

      cy.get(field)
        .invoke('text')
        .then(($new) => {
          expect($new).not.to.equal($current);
        });
    });
};

describe('Hero', () => {
  describe('Timings', () => {
    before(() => {
      cy.visit('/');
    });

    beforeEach(() => {
      cy.get('[data-cy="gregorian"]').as('gregorian');
      cy.get('[data-cy="hijri"]').as('hijri');
      cy.get('[data-cy="timings"]').as('timings');
      cy.get('[data-cy="prev"]').as('prev');
      cy.get('[data-cy="next"]').as('next');
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
      const timings = [
        'Fajr \\d{1}:\\d{2} AM\\s+\\d{1}:\\d{2} AM',
        'Sunrise \\d{1}:\\d{2} AM',
        'Dhuhr \\d{1,2}:\\d{2} [AP]M\\s+\\d{1,2}:\\d{2} PM',
        'ʿAṣr \\d{1}:\\d{2} PM\\s+\\+20 mins',
        'Maġrib \\d{1,2}:\\d{2} PM\\s+\\+5 mins',
        'ʿIshāʾ \\d{1,2}:\\d{2} PM\\s+\\d{1,2}:\\d{2} PM',
        '1/2 Night Begins \\d{1,2}:\\d{2} [AP]M',
        'Last 1/3 Night Begins \\d{1,2}:\\d{2} AM',
        'Khuṭbah al-Jumuʿah \\d{1,2}:\\d{2} PM, \\d{1,2}:\\d{2} PM',
      ];

      cy.get('@timings')
        .invoke('text')
        .should('match', new RegExp(timings.join('')));
    });

    describe('Next day', () => {
      it('should change the hijri date', () => {
        buildDiffTest('@hijri', '@next');
      });

      it('should change the timings date', () => {
        buildDiffTest('@timings', '@next');
      });
    });

    describe('Prev day', () => {
      it('should change the hijri date', () => {
        buildDiffTest('@hijri', '@prev');
      });

      it('should change the timings date', () => {
        buildDiffTest('@timings', '@prev');
      });
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should take them to Google Calendar page', () => {
      cy.get('[data-cy="calendar"]').invoke('removeAttr', 'target').click({ force: true });
      cy.title().should('include', 'Calendar');
    });

    it('should take them to Monthly Schedule page', () => {
      cy.get('[data-cy="monthly"]').click({ force: true });
      cy.title().should('include', 'Monthly');
    });

    it('should take them to Yearly Schedule page', () => {
      cy.get('[data-cy="yearly"]').click({ force: true });
      cy.title().should('include', 'Yearly');
    });
  });
});
