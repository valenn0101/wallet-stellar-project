const projectUrl = Cypress.env('BASE_URL');

describe("HomePage Component", () => {
    beforeEach(() => {
      cy.visit(projectUrl); 
    });
    it("Should render CreateKeys and Login components", () => {
      cy.get(".auth-form-title").should("contain", "Sign In");
      cy.get('[placeholder="Secret Key"]').should("exist");
      cy.get('button:contains("Submit")').should("exist");
  
      cy.contains("Don't have an account?").should("exist");
      cy.get('button:contains("Click here")').should("exist");
    });
  });
  describe("Login Component", () => {
    beforeEach(() => {
      cy.visit(projectUrl); 
      cy.get('input[type="text"]').as("inputForKey");
      cy.get('button:contains("Submit")').as("submitButton");
    });
    it("Should show a displays error toast for a secretkey lenght < 56", () => {
      const invalidSecretKey = "invalidSecretKey";
  
      cy.get("@inputForKey").type(invalidSecretKey);
      cy.get("@submitButton").click();
  
      cy.get(".error-toast").should("be.visible");
      cy.contains("Invalid Key").should("be.visible");
    });
  
    it("Should submits the form with a valid secret key", () => {
      const validSecretKey =
        "SCYV7VXVUSFMU4R4JOJL2E47UJJMK3LWL3PIZBROXP4Q3JAQVIXQFTYB";
  
      cy.get("@inputForKey").clear().type(validSecretKey);
      cy.get("@submitButton").click();
  
      cy.get(".error-toast").should("not.exist");
    });
  });
  describe("Generate Keys Component", () => {
    beforeEach(() => {
      cy.visit(projectUrl); 
    });
  
    it("Should generate secret key when you click the button 'Click here'", () => {
      cy.get('button:contains("Click here")').click();
      cy.get('input[type="text"]').should("not.have.value", "");
    });
  });