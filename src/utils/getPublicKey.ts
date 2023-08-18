import { Keypair, Server } from "stellar-sdk";

import { TESTNET_HORIZON_URL } from "./constants";

async function getPublicKey(secretKey: string): Promise<string | any> {
  try {
    const keypair = Keypair.fromSecret(secretKey);

    const server = new Server(TESTNET_HORIZON_URL);
    await server.loadAccount(keypair.publicKey());

    return keypair.publicKey();
  } catch (error) {
    return error;
  }
}

export default getPublicKey