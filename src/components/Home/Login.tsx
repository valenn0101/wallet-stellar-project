import React, { useEffect, useState, ChangeEvent } from 'react';
import { Button, Toast } from 'react-bootstrap';

import { ERROR_MESSAGES } from '../../utils/constants';

type Keypair = {
  secretKey: string | null;
  publicKey: string | null;
};

function Login({ secretKey, publicKey }: Keypair): React.ReactElement {
  const [importSecretKey, setImportSecretKey] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const importAccount = () => {
    const requiredSecretKeyLength = 56;

    if (importSecretKey.length === requiredSecretKeyLength && importSecretKey.startsWith('S')) {
      resetToastState();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      let errorMessage = ERROR_MESSAGES.invalidKey;

      if (importSecretKey.length !== requiredSecretKeyLength) {
        errorMessage = ERROR_MESSAGES.invalidLength;
      } else if (!importSecretKey.startsWith('S')) {
        errorMessage = ERROR_MESSAGES.invalidStart;
      }

      setShowToast(true);
      setErrorMessage(errorMessage);
    }
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
