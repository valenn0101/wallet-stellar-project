import React, { useState } from 'react';
import { Card, Button, Toast} from 'react-bootstrap';

import activeTestAccount from '../../../utils/activeTestAccount';
import { ALERT_MESSAGES, ERROR_MESSAGES } from '../../../utils/constants';

function ChargeAccount({ publicKey }) {
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChargeClick = async () => {
    try {
      await activeTestAccount(publicKey);
      setErrorMessage(ALERT_MESSAGES.chargeSuccess);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setErrorMessage(ERROR_MESSAGES.invalidCharge + ': ' + error.message);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Oh oh, you don't have any XLM</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">But we can help you!</Card.Subtitle>
        <Card.Text>
          The Stellar network allows you to fund your account on the test network.
        </Card.Text>
        <Button onClick={handleChargeClick} variant='success'>
          Charge
        </Button>
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide         style={{
          position: 'fixed',
          top: '50%',
          right: 20,
          zIndex: 9999,
          minWidth: '250px',
          backgroundColor: 'green',
        }}>
          <Toast.Body>
            {errorMessage}
          </Toast.Body>
        </Toast>
      </Card.Body>
    </Card>
  );
}

export default ChargeAccount;