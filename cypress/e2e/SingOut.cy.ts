import { DELAY_IN_MILLISECONDS } from "@/utils/constants";

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
    cy.tick(DELAY_IN_MILLISECONDS.DELAY_FOR_INACTIVITY_TESTING);
    cy.get("@authFormTitle")
  });

  it("Should sign out when you click the Sign Out button", () => {
      cy.get('button:contains("Continue")').click();
      cy.get(".button-wallet").click();
      cy.get(".sign-out").click();
      cy.get("@authFormTitle")
    });
});
