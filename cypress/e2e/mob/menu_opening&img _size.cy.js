describe.skip("Telnyx Core Functionality", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage({ log: true });
    cy.visit("/");
  });

  it("1. menu opening and img size", () => {
    // cy.viewport(375, 812);

    cy.get("div#main-menu").should("have.attr", "data-state", "close");

    cy.get(
      'button[aria-controls="main-menu-content"][aria-expanded="false"]'
    ).click({ force: true });
    cy.get("div#main-menu").should("have.attr", "data-state", "open");
    cy.get("#main-menu-content", { timeout: 10000 }).should("be.visible");
    cy.wait(1000);
    cy.get('#main-menu button[aria-controls="main-menu-content"]', {
      timeout: 1000,
    })
      .scrollIntoView({ behavior: "smooth", block: "center" })
      .should("be.visible")
      .click({ force: true });
    cy.get("#main-menu-content", { timeout: 10000 }).should("not.be.visible");

    cy.scrollTo(0, 5000);
    cy.wait(300);
    cy.scrollTo(0, 5000);
    cy.wait(300);
    cy.scrollTo(0, 5000);
    cy.wait(300);
    cy.scrollTo(0, 5000);
    cy.wait(500);

    cy.get(".c-fEYOND img", { timeout: 5000 }).each(($el) => {
      cy.get($el)
        .scrollIntoView({ behavior: "smooth", block: "center" })
        .should("be.visible")
        .then(($img) => {
          const rect = $img[0].getBoundingClientRect();
          expect(rect.right).to.be.lessThan(376); // ширина екрана
          expect(rect.left).to.be.gte(0); // не виходить за межі зліва
        });
    });
  });
});
