const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "7rza8s",

  e2e: {
    specPattern: "cypress/e2e/mob/**/*.cy.js",
    baseUrl: "https://telnyx.com",
    defaultCommandTimeout: 10000,
    viewportWidth: 375,
    viewportHeight: 812,
    retries: 1,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      installLogsPrinter(on, {
        printLogsToConsole: "always",
        printLogsToFile: "onFail",
      });
    },
  },
  video: false,
});
