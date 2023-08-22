describe('Sign Out', () => {
    beforeEach(() => {
      const currentTime = new Date('2023-08-22T00:00:00Z').getTime();
      cy.clock(currentTime);
      
      cy.visit("http://localhost:5173"); 
      cy.get('button:contains("Click here")').click();
    });
    
    it("Should sign out after 3 minutes", () => {
      cy.tick(190000);
      cy.get(".auth-form-title").should("contain", "Sign In");
    });

    it("Should sign out when you click the Sign Out button", () => {
        cy.get('button:contains("Continue")').click();
        cy.get(".button-wallet").click();
        cy.get(".sign-out").click();
        cy.get(".auth-form-title").should("contain", "Sign In");
    });
  });
  