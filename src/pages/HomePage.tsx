import React, { useState } from 'react';
import { useSelector } from "react-redux";

import Login from '../components/Home/Login';
import Register from '../components/Home/Register';
import SafetyAlert from '../components/Home/SafetyAlert';

function HomePage() {
  const [secret, setSecret] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const session = useSelector(state => state.session);

  console.log(publicKey, secret);

  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <div className="auth-form-content">
          { session ? (
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
