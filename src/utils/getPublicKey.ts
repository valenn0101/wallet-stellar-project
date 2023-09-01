import { Keypair } from "stellar-sdk";
import stellarServer from "./stellarServer";

async function getPublicKey(secretKey: string): Promise<string | any> {
  try {
    const keypair = Keypair.fromSecret(secretKey);

    await stellarServer.loadAccount(keypair.publicKey());

    return keypair.publicKey();
  } catch (error) {
    return error;
  }
}

export default getPublicKey