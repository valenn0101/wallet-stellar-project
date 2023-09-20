import React, { useState } from 'react';

import Login from '../components/Home/Login';
import Register from '../components/Home/Register';
import SafetyAlert from '../components/Home/SafetyAlert';
import { REQUIRED_KEYS_LENGTH } from '../utils/constants';

function HomePage() {
  const [secret, setSecret] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  const keyLength = publicKey?.length;

  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <div className="auth-form-content">
          {keyLength >= REQUIRED_KEYS_LENGTH ? (
            <SafetyAlert secretKey={secret} publicKey={publicKey} setSecret={setSecret} setPublicKey={setPublicKey} />
          ) : (
            <div>
              <Login secretKey={secret} publicKey={publicKey} setSecret={setSecret} setPublicKey={setPublicKey} />
              <Register setSecret={setSecret} setPublicKey={setPublicKey} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
