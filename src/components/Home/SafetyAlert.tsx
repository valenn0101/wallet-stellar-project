import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import WarningModal from '../WarningModal';
import { ALERT_MESSAGES } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

type Keypair = {
  secretKey: string | null;
  publicKey: string | null;
  setSecret: (secret: string | null) => void;
  setPublicKey: (publicKey: string | null) => void;
};
function SafetyAlert({ secretKey, publicKey, setSecret, setPublicKey }: Keypair): React.ReactElement {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const backHome = () => {
    setSecret(null);
    setPublicKey(null);
  };
  const handleContinue = () => {
    dispatch({
      type: "SIGN_IN",
      payload: {
        publicKey,
      },
    });
    navigate('/wallet');
  }
  return (
    <>
      <h3 className="auth-form-title safety-alert-title">
        Dear User please copy your keys!
      </h3>
      <div className="form-group mt-3">
        <div className="container">
          <h6>Your Secret Key</h6>
          <p
            className="overflow-auto secret-key"
            style={{ maxHeight: "200px" }}
          >
            {secretKey}{" "}
          </p>
        </div>

        <div className="container">
          <h6>Your Public Key</h6>
          <p
            className="overflow-auto public-key"
            style={{ maxHeight: "200px" }}
          >
            {publicKey}{" "}
          </p>
        </div>
      </div>
      <div className="d-grid gap-2 mt-3">
        <Button variant="warning" onClick={openModal}>
          {" "}
          Continue{" "}
        </Button>
        <Button variant="secondary" onClick={backHome}>
          {" "}
          Back Home{" "}
        </Button>
      </div>

      <WarningModal
        show={showModal}
        message={ALERT_MESSAGES.copyYourKeys}
        tittleMessage={ALERT_MESSAGES.alert}
        onClose={closeModal}
        onContinue = {handleContinue}
      />
    </>
  );
}

export default SafetyAlert;