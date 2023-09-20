import React, { useEffect, useState, ChangeEvent } from 'react';
import { Button, Toast } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';


import { ERROR_MESSAGES, TOAST_ALERT_MESSAGE } from '../../utils/constants';
import  getPublicKey  from '../../utils/getPublicKey';

type Keypair = {
  secretKey: string | null;
  publicKey: string | null;
  setSecret: (secret: string | null) => void;
  setPublicKey: (publicKey: string | null) => void;
};

function Login({ secretKey, publicKey, setSecret, setPublicKey }: Keypair): React.ReactElement {
  const [importSecretKey, setImportSecretKey] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (secretKey) {
      setImportSecretKey(secretKey);
    }
  }, [secretKey]);

  const handleSecretChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImportSecretKey(e.target.value);
  };
  const resetToastState = () => {
    setShowToast(false);
  };

  const importAccount = async () => {
    const requiredSecretKeyLength = 56;
    if (!publicKey) {
      setSecret(importSecretKey);
      const publicKeyResult = await getPublicKey(importSecretKey);
      if (typeof publicKeyResult === "string") {
        setPublicKey(publicKeyResult);
        dispatch({
          type: "SIGN_IN",
          payload: {
            publicKey: publicKeyResult,
          },
        })
        navigate('/wallet');
      } else {
        const errorMessage =
          publicKeyResult.message + ": " + TOAST_ALERT_MESSAGE.notFoundAccount;
        setShowToast(true);
        setErrorMessage(errorMessage);
        setPublicKey(null);
        setSecret(null);
        return;
      }
    }

    if (
      importSecretKey.length !== requiredSecretKeyLength ||
      !importSecretKey.startsWith("S")
    ) {
      const errorMessage =
        importSecretKey.length !== requiredSecretKeyLength
          ? ERROR_MESSAGES.invalidLength
          : ERROR_MESSAGES.invalidStart;

      setShowToast(true);
      setErrorMessage(errorMessage);
      return;
    }
    resetToastState();
  };
  return (
    <>
      <h3 className="auth-form-title">Sign In</h3>
      <div className="form-group mt-3">
        <h6>Your Secret Key</h6>
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Secret Key"
          value={importSecretKey}
          onChange={handleSecretChange}
        />
      </div>
      <div className="d-grid gap-2 mt-3">
        <Button variant="success" onClick={importAccount}>
          Submit
        </Button>
      </div>
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

export default Login;
