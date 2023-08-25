export const ERROR_MESSAGES = {
  invalidKey: 'Invalid secret key.',
  invalidLength: 'Secret key must be 56 characters long.',
  invalidStart: "Secret key must start with 'S'.",
  invalidCharge: 'Invalid charge.',
  notNetwork: 'Network response was not ok.',
};

export const TOAST_ALERT_MESSAGE = {
  signOut: 'Session successfully logged out',
  notFoundAccount: 'Account not found',
};

export const ALERT_MESSAGES = {
  alert: 'Please wait a moment! 🛑🛑',
  copyYourKeys: 'Please copy your keys!',
  notSession: 'Please sign in to continue',
  chargeSuccess: 'Account charged successfully!',
};

export const CUSTOM_TOAST_STYLE = {
  alertBackground: 'red',
  fontColor: 'white',
  progressBackground: 'white',
};

export const DELAY_IN_MILLISECONDS = {
  DELAY_FOR_TOAST: 6000,
  DELAY_FOR_INACTIVITY_RESET: 180000,
  DELAY_FOR_INACTIVITY_TESTING: 190000,
}

export const TESTNET_HORIZON_URL = "https://horizon-testnet.stellar.org";
