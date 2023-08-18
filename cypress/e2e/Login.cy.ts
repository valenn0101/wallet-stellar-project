describe("SafetyAlert Component", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173"); 
      cy.get('button:contains("Click here")').click();
      cy.get('button:contains("Continue")').as("continueButton");
      cy.get('button:contains("Back Home")').as("backButton");
    });
  
    it("Should render SafetyAlert component", () => {
      cy.get(".safety-alert-title").should("be.visible");
      cy.get(".secret-key").should("be.visible");
      cy.get(".public-key").should("be.visible");
    });
  
    it("Should show a Warning Alert when you click the button 'Continue'", () => {
      cy.get("@continueButton").click();
      cy.get(".modal-warning").should("be.visible");
    });
  
    it("Should show a Warning Alert when you click the button 'Close'", () => {
      cy.get("@continueButton").click();
      cy.get(".modal-warning").should("be.visible");
      cy.get(".button").contains("Close").click();
      cy.get(".modal-warning").should("not.exist");
    });
  
    it("Should back to home page when you click the button 'Back Home'", () => {
      cy.get("@backButton").click();
      cy.get(".safety-alert-title").should("not.exist");
    });
  
    it("Should show a Toastify Alert when you click the button 'Back Home", () => {
      cy.get("@backButton").click();
      cy.get(".Toastify__toast-container").should("be.visible");
    });
  });