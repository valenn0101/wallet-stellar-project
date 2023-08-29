import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

import { ERROR_MESSAGES, MINIUM_BALANCE_REQUIRED, REQUIRED_KEYS_LENGTH } from '../../../utils/constants';
import streamAccount from '../../../utils/streamAccounBalance';

function Send() {
  const [amount, setAmount] = useState('');
  const [accountReceiver, setAccountReceiver] = useState('');
  const [receiverBalance, setReceiverBalance] = useState(0);
  const [errors, setErrors] = useState({});

  const validateAmount = (value) => {
    const newErrors = { ...errors };
    if (!value || isNaN(value) || parseFloat(value) <= 0) {
      newErrors.amount = ERROR_MESSAGES.invalidAmount;
    } else {
      delete newErrors.amount;
    }
    setErrors(newErrors);
  };
  const validateAccountReceiver = async (value) => {
    const newErrors = { ...errors };

    if (value.length !== REQUIRED_KEYS_LENGTH || !value.startsWith('G')) {
      newErrors.accountReceiver =
        value.length !== REQUIRED_KEYS_LENGTH ? ERROR_MESSAGES.invalidLength : ERROR_MESSAGES.invalidPublicKey;
    } else {
      delete newErrors.accountReceiver;
    }

    const accountStream = streamAccount(value, (balance) => {
      if (typeof balance !== 'number') {
        setReceiverBalance(null);
        newErrors.accountReceiver = balance;
        setErrors(newErrors);
        return;
      }
    
      if (balance > MINIUM_BALANCE_REQUIRED) {
        delete newErrors.accountReceiver;
        setReceiverBalance(balance);
      } else if (balance < MINIUM_BALANCE_REQUIRED) {
        newErrors.accountReceiver = ERROR_MESSAGES.invalidAmount;
      }
    });
    

  setErrors(newErrors);

  };

  const handleAmountChange = (e) => {
    const newValue = e.target.value;
    setAmount(newValue);
    validateAmount(newValue);
  };

  const handleAccountReceiverChange = (e) => {
    const newValue = e.target.value;
    setAccountReceiver(newValue);
    validateAccountReceiver(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      console.log('Sending money...');
    }
  };

  return (
    <Row className="justify-content-center">
      <Col md={6}>
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
              />
              <div className="input-group-append">
                <span className="input-group-text">XLM</span>
              </div>
            </div>
            {errors.amount && <Form.Text className="text-danger">{errors.amount}</Form.Text>}
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
            {errors.accountReceiver && <Form.Text className="text-danger">{errors.accountReceiver}</Form.Text>}
            {receiverBalance > 0 && (
              <Form.Text className="text-success">
                Account is ok!
              </Form.Text>
            )}
          </Form.Group>

          <Button variant="success" className="btn-block mt-3" type="submit">
            Send
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default Send;
