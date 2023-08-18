import { Keypair } from 'stellar-sdk';

type SetKeypairProps = {
  setSecret: (secret: string | null) => void;
  setPublicKey: (publicKey: string | null) => void;
  pair?: Keypair | undefined;
};

function setKeypair({ setSecret, setPublicKey, pair }: SetKeypairProps) {
  if (pair) {
    const secret = pair.secret();
    const publicKey = pair.publicKey();

    setSecret(secret);
    setPublicKey(publicKey);
  } else {
    setSecret(null);
    setPublicKey(null);
  }
}

export default setKeypair;
