import { ERROR_MESSAGES } from "./constants";

interface Key {
  publicKey: string;
}

async function activeTestAccount({ publicKey }: Key) {
  try {
    const friendbotUrl = (import.meta.env.VITE_FRIENDBOT_URL);
    const response = await fetch(`${friendbotUrl}?addr=${publicKey}`);
    
    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.notNetwork);
    }
    
    return await response.json
  } catch (error) {
    throw error;
  }
}

export default activeTestAccount;

