describe('Telnyx homepage', () => {
    it('should open homepage', () => {
      cy.visit('/');
      cy.contains('speak with our ai assistant').should('be.visible');
    });
  });
  