describe("CI viewport check", () => {
  it("logs real and config viewport", () => {
    const w = Cypress.config("viewportWidth");
    const h = Cypress.config("viewportHeight");
    cy.task("🔧 logToCI", `Viewport: ${w}x${h}`);
    cy.log(`🔧 Cypress config viewport: ${w}x${h}`);
    console.log(`🔧 Cypress config viewport: ${w}x${h}`);

    return cy.window().then((win) => {
      const vw = win.innerWidth;
      const vh = win.innerHeight;
      cy.task("🔧 logToCI", `Viewport: ${vw}x${vh}`);
      cy.log(`🧾 Real viewport: ${vw}x${vh}`);
      console.log(`🧾 Real viewport: ${vw}x${vh}`);
    });
  });
});
