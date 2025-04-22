import APIURLS from "../apiURLs"

export const sendOTP = async (phoneNumber) => {
  try {
    const response = await fetch(APIURLS.MOBILE_VERIFY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile: phoneNumber,
        imei: "1234567890", 
      }),
    });

    const responseText = await response.text();
    console.log("API Raw Response:", responseText);

    const jsonResponse = JSON.parse(responseText.replace(/'/g, '"'));
    return jsonResponse;
  } catch (error) {
    console.error("Error in sendOTP:", error);
    throw error;
  }
};
