import { useState, useEffect } from 'react';
import { Server } from 'stellar-sdk';

import { TESTNET_HORIZON_URL } from '../utils/constants';

type BalanceResult = string | Error;

const useBalance = ({ publicKey }): BalanceResult => {
  const [balance, setBalance] = useState<BalanceResult>(undefined);
  const server = new Server(TESTNET_HORIZON_URL);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const account = await server.loadAccount(publicKey);
        const accountBalance = account.balances[0]?.balance;
        setBalance(accountBalance);
      } catch (error) {
        setBalance(new Error(error.message));
      }
    };

    const accountStream = server.accounts().accountId(publicKey).stream({
      onmessage: account => {
        const accountBalance = account.balances[0]?.balance;
        setBalance(accountBalance);
      },
    });

    fetchBalance(); 
    return () => {
      accountStream();
    };
  }, [publicKey]);

  return balance;
};

export default useBalance;
