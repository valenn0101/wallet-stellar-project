import { Server } from 'stellar-sdk';
import { ERROR_MESSAGES } from './constants';

const TESTNET_HORIZON = import.meta.env.VITE_TESTNET_HORIZON_URL;

type BalanceCallback = (balance: number | string) => void;

const streamAccount = (publicKey: string, balanceCallback: BalanceCallback) => {
  const server = new Server(TESTNET_HORIZON);

  let previousBalance: number | null = null;

  const accountStream = server.accounts().accountId(publicKey).stream({
    onmessage: (account) => {
      if ('balances' in account) {
        const balance = account.balances.find(asset => asset.asset_type === 'native');
        const xlmBalance = balance ? parseFloat(balance.balance) : 0;

        if (xlmBalance !== previousBalance) {
          previousBalance = xlmBalance;
          balanceCallback(xlmBalance);
        }
      } else {
        balanceCallback(ERROR_MESSAGES.invalidAccount);
      }
    },
    onerror: (error) => {
      balanceCallback(ERROR_MESSAGES.invalidAccount + error.message);
    }
  });

  return accountStream;
};

export default streamAccount;
