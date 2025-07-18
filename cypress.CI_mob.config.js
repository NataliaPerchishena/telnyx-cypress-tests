const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "7rza8s",

  e2e: {
    specPattern: [
      "cypress/e2e/mob/**/*.cy.js",
      "cypress/e2e/viewport_check.cy.js",
    ],
    baseUrl: "https://telnyx.com",
    defaultCommandTimeout: 10000,
    viewportWidth: 375,
    viewportHeight: 812,
    retries: 1,
    chromeWebSecurity: false,

    setupNodeEvents(on, config) {
      // Логування у консоль CI через cy.task
      on("task", {
        logToCI(msg) {
          console.log("[CYPRESS LOG]", msg);
          return null;
        },
      });
    },
  },
  video: false,
});
