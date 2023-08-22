describe("Login with Account", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173"); 
        cy.get('input[type="text"]').as("inputForKey");
        cy.get('button:contains("Submit")').as("submitButton");
      });
      it("Should login with an account and show a balance", () => {
        const validSecretKey =
          "SCYV7VXVUSFMU4R4JOJL2E47UJJMK3LWL3PIZBROXP4Q3JAQVIXQFTYB";
    
        cy.get("@inputForKey").clear().type(validSecretKey);
        cy.get("@submitButton").click();
    
        cy.get(".error-toast").should("not.exist");
        cy.get('button:contains("Continue")').click();
        cy.get(".button-wallet").click();
        cy.get(".public-key").should("be.visible");
        cy.get(".balance-info").should("be.visible");
      });
})

describe('Login without Account', () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173"); 
        cy.get('button:contains("Click here")').click();
        cy.get('button:contains("Continue")').as("continueButton");
      });
      it("Should login and not show a balance", () => {
        cy.get("@continueButton").click();
        cy.get(".button-wallet").click();
        cy.get(".title-warning").contains("Oh oh, you don't have any XLM");
        cy.get(".info").should("be.visible");
      })
})

describe('Charge account', () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173"); 
        cy.get('button:contains("Click here")').click();
        cy.get('button:contains("Continue")').click();
        cy.get(".button-wallet").click();
    });
    
    it("Should charge account", () => {
        cy.get(".charge-btn").click();
        cy.get(".toast-alert", { timeout: 10000 }).should("contain", "Account charged successfully!");
        cy.reload();
        cy.get(".balance-info").should("be.visible");
    });
});
