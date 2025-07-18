const { defineConfig } = require('cypress');
const installLogsPrinter = require('cypress-terminal-report/src/installLogsPrinter');

module.exports = defineConfig({
  projectId: '7rza8s',
  video: true,

  e2e: {
    specPattern: 'cypress/e2e/mob/**/*.cy.js',
    baseUrl: 'https://telnyx.com',
    defaultCommandTimeout: 100,
    viewportWidth: 375,
    viewportHeight: 812,
    retries: 0,

    setupNodeEvents(on, config) {
      // 1️⃣ Логи у термінал при CLI-запуску (cypress run)
      installLogsPrinter(on, {
        printLogsToConsole: 'always', 
        printLogsToFile: 'onFail', 
      });

      // 2️⃣ Кастомне для GUI-режиму (cypress open)
      on('task', {

        logToTerminal(message) {
          console.log(message);
          return null;
        },
      });
      return config;
    },
  },
});
