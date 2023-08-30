export const ERROR_MESSAGES = {
  invalidKey: 'Invalid secret key.',
  invalidLength: 'Secret key must be 56 characters long.',
  invalidStart: "Secret key must start with 'S'.",
  invalidPublicKey: 'Public key must start with "G".',
  invalidCharge: 'Invalid charge.',
  notNetwork: 'Network response was not ok.',
  invalidAmount: 'Please enter a valid amount (more than 0.5 and less/equal than your balance).',
  invalidAccount: 'Account not found. Please check the key.',
  notAccount: `This isn't your secret key.`
};

export const TOAST_ALERT_MESSAGE = {
  signOut: 'Session successfully logged out',
  notFoundAccount: 'Account not found',
  errorSending: 'Error sending money',
  successSending: 'Money sent successfully',
};

export const ALERT_MESSAGES = {
  alert: 'Please wait a moment! 🛑🛑',
  copyYourKeys: 'Please copy your keys!',
  notSession: 'Please sign in to continue',
  chargeSuccess: 'Account charged successfully!',
};

export const CUSTOM_TOAST_STYLE = {
  alertBackground: 'red',
  successBackground: 'green',
  fontColor: 'white',
  progressBackground: 'white',
};

export const DELAY_IN_MILLISECONDS = {
  DELAY_FOR_TOAST: 6000,
  DELAY_FOR_INACTIVITY_RESET: 180000,
  DELAY_FOR_INACTIVITY_TESTING: 190000,
}

export const REQUIRED_KEYS_LENGTH = 56;

export const MINIUM_BALANCE_REQUIRED = 0.5;

export const TESTNET_HORIZON_URL = "https://horizon-testnet.stellar.org";
