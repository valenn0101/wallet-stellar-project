import React from 'react';
import { Keypair, TransactionBuilder, BASE_FEE, Networks, Operation, Asset } from "stellar-sdk";
import stellarServer from '../../../utils/stellarServer';

type TransactionResult = {
    success: boolean;
    result?: any; 
    error?: string;
};


async function Transaction(secret: string, destination: string, amount: string): Promise<TransactionResult> {
    try {
        const sourceKeys: Keypair = Keypair.fromSecret(secret);
        await stellarServer.loadAccount(destination);
        const sourceAccount = await stellarServer.loadAccount(sourceKeys.publicKey());
    
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
        const result = await stellarServer.submitTransaction(transaction);

        return { success: true, result };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

export default Transaction;
