describe("Login and Account Actions", () => {
  beforeEach(() => {
    cy.visit(Cypress.env('BASE_URL')).as('projectPage');
    cy.get('input[type="text"]').as("inputForKey");
    cy.get('button:contains("Submit")').as("submitButton");
    cy.get('button:contains("Click here")').as('registerButton').click();
    cy.get('button:contains("Back Home")').as("backButton");
    cy.get('button:contains("Continue")').as("continueButton").click();
    cy.get(".button-wallet").as("warningButton").click();
    cy.get(".public-key").as("publicKey");
    cy.get(".title-warning").as("titleWarning");
    cy.get(".info").as("info");
    cy.get(".charge-btn").as("chargeBtn");
    cy.get(".sign-out").click();
  });

  it("Should log in and show the user balance", () => {
    const validSecretKey =
      "SCYV7VXVUSFMU4R4JOJL2E47UJJMK3LWL3PIZBROXP4Q3JAQVIXQFTYB";

    cy.get("@inputForKey").clear().type(validSecretKey);
    cy.get("@submitButton").click();

    cy.get(".error-toast").should("not.exist");
    cy.get("@continueButton").click();
    cy.get("@warningButton").click();
    cy.get("@publicKey").should("be.visible");
    cy.get(".balance-info").should("be.visible");
  });

  it("Should login without an account and not show a balance", () => {
    cy.get("@registerButton").click();
    cy.get("@continueButton").click();
    cy.get("@warningButton").click();
    cy.get("@titleWarning").contains("Oh oh, you don't have any XLM");
    cy.get("@info").should("be.visible");
  });

  it("Should charge the account and show a balance", () => {
    cy.get("@registerButton").click();
    cy.get("@continueButton").click();
    cy.get("@warningButton").click();
    cy.get("@chargeBtn").click();
    cy.get(".toast-alert", { timeout: 10000 }).should("contain", "Account charged successfully!");
    cy.reload();
    cy.get(".balance-info").should("be.visible");
  });
});
