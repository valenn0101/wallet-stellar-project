describe("Login and Account Actions", () => {
  const projectUrl = "http://localhost:5173";
  beforeEach(() => {
    cy.visit(projectUrl); 
    cy.get('input[type="text"]').as("inputForKey");
    cy.get('button:contains("Submit")').as("submitButton");
    cy.get('button:contains("Click here")').as('registerButton');
    cy.get('button:contains("Click here")').click();
    cy.get('button:contains("Continue")').as("continueButton");
    cy.get('button:contains("Back Home")').as("backButton").click();
  });

  it("Should log in and show the user balance", () => {
    const validSecretKey =
      "SCYV7VXVUSFMU4R4JOJL2E47UJJMK3LWL3PIZBROXP4Q3JAQVIXQFTYB";

    cy.get("@inputForKey").clear().type(validSecretKey);
    cy.get("@submitButton").click();

    cy.get(".error-toast").should("not.exist");
    cy.get("@continueButton").click();
    cy.get(".button-wallet").click();
    cy.get(".public-key").should("be.visible");
    cy.get(".balance-info").should("be.visible");
  });

  it("Should login without an account and not show a balance", () => {
    cy.get("@registerButton").click();
    cy.get("@continueButton").click();
    cy.get(".button-wallet").click();
    cy.get(".title-warning").contains("Oh oh, you don't have any XLM");
    cy.get(".info").should("be.visible");
  });

  it("Should charge the account and show a balance", () => {
    cy.get("@registerButton").click();
    cy.get("@continueButton").click();
    cy.get(".button-wallet").click();
    cy.get(".charge-btn").click();
    cy.get(".toast-alert", { timeout: 10000 }).should("contain", "Account charged successfully!");
    cy.reload();
    cy.get(".balance-info").should("be.visible");
  });
});
