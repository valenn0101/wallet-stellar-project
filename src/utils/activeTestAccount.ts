async function activeTestAccount({ publicKey }: any) {
  try {
    const response = await fetch(`https://friendbot.stellar.org?addr=${publicKey}`);
    
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