import WarningModal from "../../src/components/WarningModal";
import 'bootstrap/dist/css/bootstrap.min.css';

describe("WarningModal Component", () => {
  it("Should renders correctly with given props", () => {
    const props = {
      show: true,
      onClose: cy.stub(),
      tittleMessage: "Warning!",
      message: "This is a warning message.",
      onContinue: cy.stub()
    };

    cy.mount(<WarningModal {...props} />);

    cy.get(".modal-warning").should("be.visible");
    cy.get(".modal-title").should("have.text", "Warning!");
    cy.get(".modal-body").should("have.text", "This is a warning message.");
    cy.get(".button").contains("Close").should("be.visible");
    cy.get(".button").contains("Continue").should("be.visible");
  });
});