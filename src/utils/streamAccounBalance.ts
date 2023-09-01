import { Server } from 'stellar-sdk';
import { ERROR_MESSAGES } from './constants';

const TESTNET_HORIZON = import.meta.env.VITE_TESTNET_HORIZON_URL;

type BalanceCallback = (balance: number | string) => void;

let currentPublicKey: string | null = null;
let accountStream: any = null;

const streamAccount = (publicKey: string, balanceCallback: BalanceCallback) => {
  if (publicKey !== currentPublicKey) {
    currentPublicKey = publicKey;
    if (accountStream) {
      accountStream();
      accountStream = null;
    }
  }

  if (!accountStream) {
    const server = new Server(TESTNET_HORIZON);

    accountStream = server.accounts().accountId(publicKey).stream({
      onmessage: (account) => {
        if ('balances' in account) {
          const balance = account.balances.find(asset => asset.asset_type === 'native');
          const xlmBalance = balance ? parseFloat(balance.balance) : 0;

          if (typeof xlmBalance === 'number') {
            balanceCallback(xlmBalance);
          }
        } else {
          balanceCallback(ERROR_MESSAGES.invalidAccount);
        }
      },
      onerror: (error) => {
        balanceCallback(ERROR_MESSAGES.invalidAccount + error);
      }
    });
  }

  return () => {
    if (accountStream) {
      accountStream();
      accountStream = null;
    }
  };
};

export default streamAccount;
