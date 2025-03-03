/**A utility function to help us first generate an access token */
const axios = require("axios");

/**here we are creating a 64base encoded consumer secret */
const credentials = Buffer.from(
  `${process.env.DARAJA_CONSUMER_KEY}:${process.env.DARAJA_CONSUMER_SECRET}`
).toString("base64");

const generateTimeStamp = function () {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");

  return `${year}${month}${date}${hour}${minute}${second}`;
};

const generateOAUTHToken = async function () {
  const tokenResponse = await axios({
    method: "get",
    url: process.env.SAFARICOM_DARAJA_TOKEN_URL,
    /**TODO Will be returned when developing atual app */
    headers: {
      Authorization: `Basic ${credentials} `,
    },
  });

  return tokenResponse.data;
};

exports.initiatePayRequest = async function (userNumber, amount) {
  /**First generate the token which will be the password in the request body */
  const { access_token } = await generateOAUTHToken();

  /**Current timestamp of the transaction */
  const timesTampNow = generateTimeStamp();

  /**Password */
  const password = Buffer.from(
    `${process.env.SAFARICOM_BUSINESS_SHORT_CODE}` +
      "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" +
      timesTampNow
  ).toString("base64");

  /**Initiate the mpesa API STK PUSH */
  const response = await axios({
    method: "post",
    url: process.env.SAFARICOM_PUSH_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token} `,
    },
    data: {
      BusinessShortCode: `${process.env.SAFARICOM_BUSINESS_SHORT_CODE}`,
      Password: `${password}`,
      Timestamp: `${timesTampNow}`,
      TransactionType: "CustomerPayBillOnline",
      Amount: `${amount}`,
      PartyA: `${userNumber}`,
      PartyB: `${process.env.SAFARICOM_BUSINESS_SHORT_CODE}`,
      PhoneNumber: `${userNumber}`,
      CallBackURL:
        "https://985e-105-161-95-246.ngrok-free.app/api/v1/transactions/callback",
      AccountReference: "Apartment Management System",
      TransactionDesc: "Please enter your pin inorder to pay rent ksh 5000.",
    },
  });

  console.log("This is the response", response.data);

  return response.data;
};
