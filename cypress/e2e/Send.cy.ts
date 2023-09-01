import { ERROR_MESSAGES, ALERT_MESSAGES } from "@/utils/constants";

describe("Login and Account Actions", () => {
    const validSecretKey =
        "SCYV7VXVUSFMU4R4JOJL2E47UJJMK3LWL3PIZBROXP4Q3JAQVIXQFTYB";
    const validAmount = '1';
    const invalidAmount = '99999999';
    const validReceiverKey = 'GDHCQI34CETZ6IXDPPOPDIRXDOO5556BDS25EWNZDJF37BD5QJK5IN2F';
    const validSenderKey = validSecretKey;
    const invalidReceiverKey = 'invalidReceiver';

    beforeEach(() => {
        cy.visit(Cypress.env('BASE_URL')).as('projectPage');
        cy.get('input[type="text"]').clear().type(validSecretKey);
        cy.get('button:contains("Submit")').click();
        cy.get('button:contains("Continue")').click();
        cy.get(".button-wallet").as("warningButton").click();
        cy.get("input[placeholder=\"Enter amount\"]").as("amountInput").clear().type(validAmount);
        cy.get("input[placeholder=\"Enter account receiver\"]").as("receiverInput").clear().type(validReceiverKey);
        cy.get("input[placeholder=\"Enter your secret key\"]").as("secretKeyInput");
        cy.get('button:contains("Send")').as("sendButton");
    });

    it("Should log in and show the transaction inputs", () => {
        cy.get('@amountInput').should("be.visible");
        cy.get('@receiverInput').should("be.visible");
    });

    it("Should show error messages for invalid values", () => {
        cy.get('@amountInput').clear().type(invalidAmount);
        cy.get('.amount-error').should("be.visible").should("have.text", ERROR_MESSAGES.invalidAmount);

        cy.get('@receiverInput').clear().type(invalidReceiverKey);
        cy.get('.receiver-error').should("be.visible");
    });

    it("Should display sender input and success message for valid values", () => {
        cy.get('@amountInput').clear().type(validAmount);
        cy.get('@receiverInput').clear().type(validReceiverKey);
        cy.get('.receiver-success').should("have.text", ALERT_MESSAGES.accountPass);
        cy.get('@secretKeyInput').should("be.visible");
    });

    it('Should show ModalWarning when "Send" button is clicked', () => {
        cy.get('@secretKeyInput').clear().type(validSenderKey);
        cy.get('@sendButton').click();
        cy.get(".modal-warning").should("be.visible");
    });

    it('Should show Loading Spinner and Toastify Alert after completing steps', () => {
        cy.get('@secretKeyInput').clear().type(validSenderKey);
        cy.get('@sendButton').click();
        cy.get(".modal-warning").should("be.visible");
        cy.get('button:contains("Continue")').click();
        cy.get(".loading-spinner", { timeout: 10000 }).should("be.visible");
        cy.get(".Toastify__toast-container", { timeout: 30000 }).should("be.visible");
    });
});
