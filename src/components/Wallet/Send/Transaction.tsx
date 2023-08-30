import React from 'react';
import { Server, Keypair, TransactionBuilder, BASE_FEE, Networks, Operation, Asset } from "stellar-sdk";

type TransactionResult = {
    success: boolean;
    result?: any; 
    error?: string;
};

const TESTNET_HORIZON: string = import.meta.env.VITE_TESTNET_HORIZON_URL;
const server: Server = new Server(TESTNET_HORIZON);

async function Transaction(secret: string, destination: string, amount: string): Promise<TransactionResult> {
    try {
        const sourceKeys: Keypair = Keypair.fromSecret(secret);
        await server.loadAccount(destination);
        const sourceAccount = await server.loadAccount(sourceKeys.publicKey());
    
        const transaction = new TransactionBuilder(sourceAccount, {
          fee: BASE_FEE,
          networkPassphrase: Networks.TESTNET
        })
          .addOperation(
            Operation.payment({
              destination,
              asset: Asset.native(),
              amount
            })
          )
          .setTimeout(180)
          .build();
    
        transaction.sign(sourceKeys);
        const result = await server.submitTransaction(transaction);

        return { success: true, result };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

export default Transaction;
