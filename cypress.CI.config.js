const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "7rza8s", 

  e2e: {
    baseUrl: 'https://telnyx.com',
    defaultCommandTimeout: 10000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    retries: 1,
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  video: false,
});
