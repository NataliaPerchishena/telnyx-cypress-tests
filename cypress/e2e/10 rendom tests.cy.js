describe('Telnyx Core Functionality', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage({ log: true });
        cy.visit('/');
    })
  
    it('1. checks homepage elements is visisble: h1, menu, healthcare-coordinator, Lets Talk, Talk to Expert, Log in and Sign up, sections, footer', () => {
        cy.get('body').should('be.visible');
        cy.get('h1').should('contain.text', 'Build Voice AI');

        cy.get('#main-menu-content').find('a, button').should('have.length', 6).each(($el) => {
            const tag = $el[0].tagName.toLowerCase()
            if (tag === 'a') {
                expect($el).to.have.attr('href')
            } else if (tag === 'button') {
                expect($el).to.have.attr('type', 'button')
            }
        });
        
        cy.get('input#support-specialist').parents('label').should('be.visible')
        cy.get('#healthcare-coordinator').should('not.be.checked');
        cy.get('label[for="healthcare-coordinator"]').click({ force: true })
        cy.get('#healthcare-coordinator').should('be.checked');

        cy.contains("Let's Talk").should('be.visible').and('be.enabled');
  
        cy.get('a.c-hzhYFJ[href="https://portal.telnyx.com"]').should('contain.text', 'Log in').should('be.visible');
        cy.xpath('//*[@id="main-menu"]/a[@href="/sign-up"]').find('span').should('contain.text', 'Sign up').should('be.visible');

        cy.scrollTo(0, 1000);
        cy.wait(1000);
        // cy.scrollTo(0, 2000);
        // cy.wait(200);
        // cy.scrollTo(0, 2000);
        // cy.wait(300);
      cy.get('.c-dSaVYE a[href="/contact-us"]')
       .scrollIntoView({ behavior: 'smooth', block: 'center' })
        .find('span', {timeout:1000}).should('contain.text', 'Talk to an expert').should('be.visible');
  
        cy.get('section.c-kemNbD').should('have.length', 11);

        cy.get('footer a.c-fZcwcz').should('have.length.at.least', 1);
    });
  
    it('2. shows cookie banner', () => {
        cy.get('body').then($body => {
          if (!$body.find('#onetrust-policy').length) {
            cy.reload();
          }
        });
      cy.wait(10000)
        cy.get('#onetrust-policy').should('be.visible').find('a[class="ot-cookie-policy-link"]', { timeout: 50000 }).should('be.visible').and('have.attr', 'href', 'https://telnyx.com/cookie-policy')
        cy.get('#onetrust-close-btn-container button.onetrust-close-btn-handler').click()
      });

    it('3. opens Solutions, checks 8 links, banner & header on opened pages', () => {
        cy.contains('button', 'Solutions').click();

        cy.get('div[role="menuitem"] a[href^="/solutions/"]').should('have.length', 8).each(($el) => {
          const href = $el.attr('href');
            cy.visit(href);
 
            cy.get('h1').should('be.visible');
      
            cy.get('video, div.c-hlTHTT').should('exist').and('be.visible');

            cy.go('back');
           // cy.wait(1000);
            cy.contains('button', 'Solutions').click({force: true});
        });
        
      });
  
    it('4. check Voice API page details: h1, sing-up link, section HOW IT WORKS, go to voice api price page', () => {
      cy.get('#main-menu-content').contains('Products').click({ force: true });
      cy.contains('Voice API').click();
      cy.url().should('include', '/voice-api');
        cy.contains('Voice API').should('be.visible');
        cy.get('h1').should('contain.text', 'Voice API');
        cy.get('#5AlorK3xNwzmq1oPSc2JDU').invoke('attr', 'href', '/sign-up')
        cy.get('#4HMqTyXBjbCynLmeYMiCr6').should('be.visible').and('contain.text', 'HOW IT WORKS');
        cy.get('#6r8VmXEhFy5cWLN7L7zwNG').should('be.visible').click({ force: true })
        cy.get('h1').should('contain.text', 'Voice API pricing');
    });
  
    it('5. click Pricing link', () => {
        cy.get('#main-menu a[href="/pricing"]').click({force: true})
        cy.url().should('include', '/pricing');
    });
  
    it('6. Go to Country specific information/Greek and check link for doc (atrr target)', () => {
        cy.get('footer').scrollIntoView()
        //cy.wait(1000);
        cy.get('footer').contains('Country Specific Requirements').should('exist').click({force: true})
        cy.get('h1').should('contain.text', 'Country Specific Requirements')
        //cy.wait(1000)
        cy.get('#5YlkNBpPPT2LXsu66qZCyZ').scrollIntoView().should('not.be.disabled').and('be.visible').click({force: true})
        cy.contains('a.c-ewUecD', 'Greek T&C').should('be.visible').should('have.attr', 'target', '_blank');

    });
  
    it('7. opens first blog article, subscribe form is present', () => {
    cy.contains('button', 'Resources').click({force: true});
      cy.get('#56rRrYt4QQ2hqYdizBNnIk').click({force: true});
       cy.get('#articles a.c-zVEiA').first().click({ force: true });
       cy.get('h1').should('exist');
       cy.get('#t3vlyisfxe8b9jwv9vf9qn1q').should('not.be.empty').children().should('have.length.greaterThan', 0)
       cy.get('#mktoForm_1470').scrollIntoView().should('exist')
      cy.wait(2000)
       cy.get('#onetrust-close-btn-container button.onetrust-close-btn-handler').click({force: true})
       cy.get('label[for="Email"]', { timeout: 5000 }).should('be.visible').and('contain.text', 'Company Email')
       cy.get('#Email').should('be.visible').type('emailCtest@gmail.com')
      cy.get('button[type="submit"]', { timeout: 5000 }).should('be.visible').click()
      cy.get('.c-fDKbEm', {timeout: 1000}).find('p').should('include.text', 'Great!')
    });
  
    it('8. opens sign-up form and checks required fields', () => {
        cy.get('#main-menu a[href="/sign-up"]', {timeout: 1000}).click({force: true});
        cy.url().should('include', '/sign-up');
        cy.get('h1').should('contain.text', 'Create a Telnyx account');
      
        cy.get('form[aria-label="signup-form"]').should('be.visible');
      
        const requiredFields = ['#email', '#first_name', '#last_name', '#password', '#terms_and_conditions'];
      
        requiredFields.forEach((selector) => {
          cy.get(selector, {waitForAnimations:true}).should('exist');
        });
      
        cy.get('button[type="submit"] span[data-content="SIGN UP"]').click({ force: true });
      cy.wait(3000)
        requiredFields.forEach((selector) => {
          cy.get(selector).should('have.attr', 'aria-invalid', 'true')
          cy.get(selector).invoke('attr', 'aria-errormessage').then((errorId) => {
              cy.get(`#${errorId}`).should('exist').and('be.visible')
            });
        });
    });
      
   
    it('9. Reason_for_Contact is required in form Contact us (Talk to an expert)', () => {
        cy.scrollTo(0, 5000);
        cy.wait(200);
        cy.scrollTo(0, 2000);
        cy.wait(200);
        cy.scrollTo(0, 2000);
        cy.wait(300);
        cy.xpath('//*[contains(@class, "c-dSaVYE")]/a[@href="/contact-us"]').click({ force: true });
        cy.get('form').should('be.visible');
        cy.wait(2000)  
        // cy.get('button[type="submit"]', {waitForAnimations:true}).invoke('text').then((text) => {
        //     expect(text.trim().toLowerCase()).to.include('submit');
        // });
    
        cy.get('#Reason_for_Contact__c', { timeout: 5000 }).should('exist').and('have.attr', 'aria-required', 'true');
        cy.get('button[type="submit"]').click({ force: true });
        cy.get('#Reason_for_Contact__c').should('have.class', 'mktoInvalid');
        cy.get('#ValidMsgReason_for_Contact__c').should('exist').and('be.visible')
    });
    
  it('10. mobile layout', () => {
    cy.viewport(375, 812);
    cy.get('div#main-menu').should('have.attr', 'data-state', 'close')
    
    cy.get('button[aria-controls="main-menu-content"][aria-expanded="false"]').click({ force: true });
    cy.get('div#main-menu').should('have.attr', 'data-state', 'open')
    cy.get('#main-menu-content', { timeout: 10000 }).should('be.visible');
      
    cy.get('#main-menu button[aria-controls="main-menu-content"]').should('be.visible').click({ force: true });
    cy.get('#main-menu-content', { timeout: 10000 }).should('not.be.visible')

    cy.scrollTo(0, 5000);
    cy.wait(200);
    cy.scrollTo(0, 5000);
    cy.wait(200);
    cy.scrollTo(0, 5000);
    cy.wait(300);
    cy.scrollTo(0, 5000);
    cy.wait(300);
          
    cy.get('.c-fEYOND img').each($el => {
      cy.get($el).scrollIntoView()
        .should('be.visible')
        .then($img => {
          const rect = $img[0].getBoundingClientRect();
          expect(rect.right).to.be.lessThan(376); // ширина екрана
          expect(rect.left).to.be.gte(0);         // не виходить за межі зліва
        })
    });
  });

});
    

    after(() => {
        if (Cypress.env('CI')) {
          Cypress.runner.stop();
        }
      });