import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

function Send() {
  return (
    <>
      <Row>
        <Col>
          <h3 className="text-primary">Send your money</h3>
          <Form>
            <div className="input-group">
              <Form.Control type="number" placeholder="Enter amount" />
              <div className="input-group-append">
                <span className="input-group-text">XLM</span>
              </div>
            </div>
            <Button variant="success" className="btn-block mt-3">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Send;
