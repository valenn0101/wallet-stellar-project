import { Server } from 'stellar-sdk';

const TESTNET_HORIZON = import.meta.env.VITE_TESTNET_HORIZON_URL;

const stellarServer = new Server(TESTNET_HORIZON);

export default stellarServer;