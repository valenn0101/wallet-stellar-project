import React, { useState } from 'react';
import { Button, Col, Form, Row, Toast } from 'react-bootstrap';

import { ERROR_MESSAGES, TOAST_ALERT_MESSAGE } from '../../../utils/constants';

function Send() {
  const [amount, setAmount] = useState('');
  const [accountReceiver, setAccountReceiver] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAccountReceiverChange = (e) => {
    setAccountReceiver(e.target.value);
  };

  const resetToastState = () => {
    setShowToast(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredPublicKeyLength = 56;

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      const errorMessage = TOAST_ALERT_MESSAGE.notAmount;
      setShowToast(true);
      setErrorMessage(errorMessage);
      return;
    }

    if (accountReceiver.length !== requiredPublicKeyLength || !accountReceiver.startsWith('G')) {
      const errorMessage =
        accountReceiver.length !== requiredPublicKeyLength
          ? ERROR_MESSAGES.invalidLength
          : ERROR_MESSAGES.invalidStartPublic;
      setShowToast(true);
      setErrorMessage(errorMessage);
      return;
    }

    resetToastState();

  };

  return (
    <>
      <Row>
        <Col>
          <h3 className="text-primary">Send Your Money</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={handleAmountChange}
                  required
                  step={0.0001}
                />
                <div className="input-group-append">
                  <span className="input-group-text">XLM</span>
                </div>
              </div>
            </Form.Group>

            <Form.Group controlId="accountReceiver">
              <Form.Label>Account Receiver</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter account receiver"
                value={accountReceiver}
                onChange={handleAccountReceiverChange}
                required
              />
            </Form.Group>

            <Button variant="success" className="btn-block mt-3" type="submit">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
      <Toast
        show={showToast}
        style={{
          position: 'fixed',
          top: '50%',
          right: 20,
          zIndex: 9999,
          minWidth: '250px',
          backgroundColor: 'red',
        }}
        className="error-toast"
        onClose={() => setShowToast(false)}
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto" style={{ color: 'white' }}>
            Invalid Key
          </strong>
        </Toast.Header>
        <Toast.Body style={{ color: 'white' }}>{errorMessage}</Toast.Body>
      </Toast>
    </>
  );
}

export default Send;
