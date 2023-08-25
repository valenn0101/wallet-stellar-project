import "./WalletPage.css";
import React from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import Balance from "../components/Wallet/Balance/Balance";


function HomeWallet(): React.ReactElement {
  const publicKey = useSelector((state) => state.publicKey);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const backHome = () => {
    navigate('/');
    dispatch({
      type: "SIGN_OUT",
    });
  };
  return (
    <Container className="home-wallet-container">
      <div className="home-wallet-content">
        <Row>
          <Col>
            <h3 className="text-primary">Public key</h3>
            <Alert variant="warning public-key">{publicKey}</Alert>
          </Col>
        </Row>
        <hr />
          <Balance publicKey={publicKey} />
        <hr />
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
        <hr />
        <Row>
          <Col>
            <Button variant="danger" className="btn-block sign-out" onClick={backHome}>
              Sign out
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default HomeWallet;