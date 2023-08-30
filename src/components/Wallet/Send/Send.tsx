import React, { useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

import WarningModal from '../../WarningModal';
import {
  ERROR_MESSAGES,
  MINIUM_BALANCE_REQUIRED,
  REQUIRED_KEYS_LENGTH,
  CUSTOM_TOAST_STYLE,
  ALERT_MESSAGES,
  TOAST_ALERT_MESSAGE,
} from '../../../utils/constants';
import streamAccount from '../../../utils/streamAccounBalance';
import getPublicKey from '../../../utils/getPublicKey';
import Transaction from './Transaction';

function Send({ balance }) {
  const publicKey = useSelector((state) => state.publicKey);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [accountReceiver, setAccountReceiver] = useState('');
  const [accountSender, setAccountSender] = useState(null);
  const [receiverBalance, setReceiverBalance] = useState(0);
  const [errors, setErrors] = useState({});

  const maxAmount = Number(balance);

  const validateAmount = (amount) => {
    const newErrors = { ...errors };
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0 || parseFloat(amount) > maxAmount) {
      newErrors.amount = ERROR_MESSAGES.invalidAmount;
    } else {
      delete newErrors.amount;
    }
    setErrors(newErrors);
  };
  const validateAccountReceiver = async (keyReceiver) => {
    const newErrors = { ...errors };

    if (keyReceiver.length !== REQUIRED_KEYS_LENGTH || !keyReceiver.startsWith('G')) {
      newErrors.accountReceiver =
        keyReceiver.length !== REQUIRED_KEYS_LENGTH ? ERROR_MESSAGES.invalidLength : ERROR_MESSAGES.invalidPublicKey;
    } else {
      delete newErrors.accountReceiver;
    }

    const accountStream = streamAccount(keyReceiver, (balance) => {
      if (typeof balance !== 'number') {
        setReceiverBalance(null);
        newErrors.accountReceiver = balance;
        setErrors(newErrors);
        return;
      }

      if (balance >= MINIUM_BALANCE_REQUIRED) {
        delete newErrors.accountReceiver;
        setReceiverBalance(balance);
      } else if (balance < MINIUM_BALANCE_REQUIRED) {
        newErrors.accountReceiver = ERROR_MESSAGES.invalidAmount;
      }
    });

    setErrors(newErrors);
  };
  const validateAccountSender = async (secretKey) => {
    const newErrors = { ...errors };

    if (secretKey.length !== REQUIRED_KEYS_LENGTH || !secretKey.startsWith('S')) {
      newErrors.accountSender =
        secretKey.length !== REQUIRED_KEYS_LENGTH ? ERROR_MESSAGES.invalidLength : ERROR_MESSAGES.invalidStart;
    } else {
      delete newErrors.accountSender;
    }

    const yourAccount = await getPublicKey(secretKey);

    if (typeof yourAccount === 'string') {
      if (yourAccount !== publicKey) {
        newErrors.accountSender = ERROR_MESSAGES.notAccount;
      } else {
        delete newErrors.accountSender;
      }
    } else {
      newErrors.accountSender = yourAccount.message + ': ' + ERROR_MESSAGES.invalidAccount;
    }

    setErrors(newErrors);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
    validateAmount(newAmount);
  };

  const handleAccountReceiverChange = (e) => {
    const newKey = e.target.value;
    setAccountReceiver(newKey);
    validateAccountReceiver(newKey);
  };

  const handleAccountSenderChange = (e) => {
    const newSecretKey = e.target.value;
    setAccountSender(newSecretKey);
    validateAccountSender(newSecretKey);
  };


  const handleContinue = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        setLoading(true);
        await Transaction(accountSender, accountReceiver, amount);
      } catch (error) {
        toast.info(TOAST_ALERT_MESSAGE.errorSending + error.message,{
          style: {
            background: CUSTOM_TOAST_STYLE.alertBackground,
            color: CUSTOM_TOAST_STYLE.fontColor,
          },
          progressStyle: {
            background: CUSTOM_TOAST_STYLE.progressBackground,
          }
        })
      } finally {
        setLoading(false);
        setShowModal(false);
        toast.info(TOAST_ALERT_MESSAGE.successSending,{
          style: {
            background: CUSTOM_TOAST_STYLE.successBackground,
            color: CUSTOM_TOAST_STYLE.fontColor,
          },
          progressStyle: {
            background: CUSTOM_TOAST_STYLE.progressBackground,
          }
        })
      }
    }
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="text-primary">Send Your Money</h3>
          <Form>
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
              {receiverBalance > 0 && <Form.Text className="text-success">Account is ok!</Form.Text>}
            </Form.Group>
            {receiverBalance >= MINIUM_BALANCE_REQUIRED && (
              <Form.Group controlId="accountSender">
                <Form.Label>Your Secret Key</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your secret key"
                  value={accountSender}
                  onChange={handleAccountSenderChange}
                  required
                />
                {errors.accountSender && <Form.Text className="text-danger">{errors.accountSender}</Form.Text>}
              </Form.Group>
            )}
            <Button
              onClick={openModal}
              variant="success"
              className="btn-block mt-3"
              disabled={Object.keys(errors).length > 0 || !accountSender}
            >
              Send
            </Button>
          </Form>
        </Col>
      </Row>
      <WarningModal
        show={showModal}
        tittleMessage={ALERT_MESSAGES.alert}
        message={
          loading ? (
            <Spinner animation="border" size="sm" variant="info" />
          ) : (
            `${amount}$ is about to be subtracted from your account`
          )
        }
        onClose={closeModal}
        onContinue={handleContinue}
        type="submit"
      />
      <ToastContainer />
    </>
  );
}

export default Send;
