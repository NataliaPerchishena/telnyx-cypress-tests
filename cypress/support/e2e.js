// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
require('cypress-xpath');
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

// Cypress.on('window:before:load', (win) => {
//     // Повністю блокуємо всі fetch-запити
//     win.fetch = () => new Promise(() => {});
//   });

// Cypress.on('window:before:load', (win) => {
//     const originalFetch = win.fetch;
  
//     win.fetch = function (...args) {
//       const url = typeof args[0] === 'string' ? args[0] : args[0]?.url || '';
  
//       const blockedDomains = [
//         'openreplay',
//         'vector.co',
//           '**intercom**',
//         'intercom',
//         '/pixel',
//           'challenges',
//           '**challenges**',
//       ];
  
//       if (blockedDomains.some(domain => url.includes(domain))) {
//         return new Promise(() => {}); // блокуємо тільки небажані запити
//       }
  
//       return originalFetch.apply(this, args);
//     };
// });
  
Cypress.on('fail', (error, runnable) => {
  console.error('❌ Тест упав!');
  console.error('🔴 Повідомлення:', error.message);
  console.error('🔍 Стек:', error.stack);
  throw error;
});