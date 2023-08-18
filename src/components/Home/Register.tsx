import React from 'react';
import { Button } from 'react-bootstrap';
import { Keypair } from 'stellar-sdk';
import setKeypair from '../../utils/setKeyPair';

interface RegisterProps {
  setSecret: (secret: string | null) => void;
  setPublicKey: (publicKey: string | null) => void;
}

function Register({ setSecret, setPublicKey }: RegisterProps): React.ReactElement {
  const handleCreateAccount = () => {
    const pair = Keypair.random();
    setKeypair({
      setSecret,
      setPublicKey,
      pair,
    });
  };

  return (
    <div className="d-grid gap-2 mt-3">
      <p>Don&apos;t have an account? 👇👇👇</p>
      <Button variant="secondary" onClick={handleCreateAccount}>
        Click here
      </Button>
    </div>
  );
}

export default Register;
