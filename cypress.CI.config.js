const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "7rza8s",

  e2e: {
    specPattern: "cypress/e2e/desktop/**/*.cy.js",
    baseUrl: "https://telnyx.com",
    defaultCommandTimeout: 20000,
    viewportWidth: 1280,
    viewportHeight: 720,
    retries: 1,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  video: false,
});
