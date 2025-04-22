
import APIURLS from "../../apiUtils/apiURLs";

export const storeQRData = async (data, phoneNumber) => {
  const payload = {
    data: JSON.stringify({
      mobile: phoneNumber,
      dt: new Date().toISOString().replace("T", " ").slice(0, 19),
      location: data,
    }),
  };

  console.log("Storing this data to API:", payload);
  console.log("Sending QR data to:", APIURLS.COLLECT_QR_DATA);

  try {
    const response = await fetch(APIURLS.COLLECT_QR_DATA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log("Raw API Response:", responseText);

    const jsonSafeString = responseText.replace(/'/g, '"');
    const result = JSON.parse(jsonSafeString);

    return result;
  } catch (error) {
    console.error("Network or Server Error:", error);
    throw new Error("Network or server error while sending QR data.");
  }
};
