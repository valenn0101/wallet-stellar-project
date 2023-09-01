import { useState, useEffect } from 'react';
import stellarServer from '../utils/stellarServer';

type BalanceResult = string | Error;


const useBalance = ({ publicKey }): BalanceResult => {
  const [balance, setBalance] = useState<BalanceResult>(undefined);


  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const account = await stellarServer.loadAccount(publicKey);
        const accountBalance = account.balances[0]?.balance;
        setBalance(accountBalance);
      } catch (error) {
        setBalance(new Error(error.message));
      }
    };

    const accountStream = stellarServer.accounts().accountId(publicKey).stream({
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
