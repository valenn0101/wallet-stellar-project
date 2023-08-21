import React from 'react';
import { Card, Button} from 'react-bootstrap';

function ChargeAccount() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Oh oh, you don't have any XLM</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">But we can help you!</Card.Subtitle>
        <Card.Text>
        The Stellar network allows you to fund your account on the test network.
        </Card.Text>
        <Button href="#" variant='success'>Charge</Button>
      </Card.Body>
    </Card>
  );
}

export default ChargeAccount;