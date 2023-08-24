interface Key {
  publicKey: string;
}

async function activeTestAccount({ publicKey }: Key) {
  try {
    const friendbotUrl = (import.meta.env.VITE_FRIENDBOT_URL);
    const response = await fetch(`${friendbotUrl}?addr=${publicKey}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const responseJSON = await response.json();
    return responseJSON;
  } catch (error) {
    throw error;
  }
}

export default activeTestAccount;

