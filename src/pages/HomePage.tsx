import { useState } from 'react';
import Login from '../components/Home/Login';
import Register from '../components/Home/Register';

function HomePage() {
  const [secret, setSecret] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <div className="auth-form-content">
          <Login secretKey={secret} publicKey={publicKey} />
          <Register setSecret={setSecret} setPublicKey={setPublicKey} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
