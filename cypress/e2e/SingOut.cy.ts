describe('Sign Out', () => {
  const projectUrl = Cypress.env('LOCALHOST_URL');
  beforeEach(() => {
    const currentTime = Date.now();
    cy.clock(currentTime);
    cy.visit(projectUrl); 
    cy.get(".auth-form-title").should("contain", "Sign In").as("authFormTitle");
    cy.get('button:contains("Click here")').click();
  });

  it("Should log out after 3 minutes of inactivity", () => {
    cy.tick(190000);
    cy.get("@authFormTitle")
  });

  it("Should sign out when you click the Sign Out button", () => {
      cy.get('button:contains("Continue")').click();
      cy.get(".button-wallet").click();
      cy.get(".sign-out").click();
      cy.get("@authFormTitle")
    });
});
