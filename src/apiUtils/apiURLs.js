const SOLIDZ_BASE_URL = process.env.API_URL || 'https://app.solidz.io/';
const MOBILE_VERIFY_ENDPOINT = 'mobile_verify/';
const COLLECT_QR_DATA ='guard_patrol/collect_data/';
const APIURLS = {
    
    SOLIDZ_BASE_URL,
    MOBILE_VERIFY: `${SOLIDZ_BASE_URL}${MOBILE_VERIFY_ENDPOINT}`,
    COLLECT_QR_DATA :  `${SOLIDZ_BASE_URL}${COLLECT_QR_DATA}`,
  };

  export default APIURLS;