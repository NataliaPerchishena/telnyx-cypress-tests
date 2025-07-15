describe('Telnyx homepage', () => {
    it('should open homepage', () => {
      cy.visit('https://telnyx.com/');
      cy.contains('speak with our ai assistant').should('be.visible');
    });
  });
  