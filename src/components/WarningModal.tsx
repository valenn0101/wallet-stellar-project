import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface WarningModalProps {
  show: boolean;
  onClose: () => void;
  tittleMessage: string;
  message: string;
}

function WarningModal(props: WarningModalProps): React.ReactElement {
  const { show, onClose, tittleMessage, message } = props;

  return (
    <Modal
      centered
      show={show}
      backdrop="static"
      className="modal-warning"
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{tittleMessage}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="button" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" className="button" onClick={onClose}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WarningModal;
