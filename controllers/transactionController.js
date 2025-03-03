const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { initiatePayRequest } = require("../utils/darajaAPI");

const Transaction = require("./../models/transactionModel");

/**Here we shall be handling all maters transaction */
exports.getTransaction = catchAsync(async (req, res, next) => {
  /**This will be defined as an arbitrary value: FIXME TO BE UPDATED*/
  const amount = 10;
  const phone = req.body.phone;

  const paymentResponse = await initiatePayRequest(phone, amount);

  if (paymentResponse.ResponseCode !== "0") {
    return next(new AppError("Request failed,please try again!", 404));
  }

  res.status(200).json({
    status: "success",
    data: paymentResponse?.ResponseDescription,
  });
});

/**Endpoint for the confirmation of our api request status */
exports.getCallback = catchAsync(async (req, res, next) => {
  console.log(req.body?.Body);
  /**If the transaction was successfull,we need to create the transaction in the DB */
  if (req.body?.Body || req.body.stkCallback.ResultCode === 0) {
    const items = req.body.stkCallback.CallbackMetadata?.item || [];

    const paymentData = {
      phoneNumber: items.find(item => item.Name === "PhoneNumber").Value,
      mpesatransactionCode: items.find(
        item => item.Name === "MpesaReceiptNumber"
      ).Value,
      createdAt: items.find(item => item.Name === "TransactionDate").Value,
      amountPaid: items.find(item => item.Name === "Amount").Value,
    };

    const data = await Transaction.create(paymentData);

    if (!data) {
      return next(new AppError("There was an error processing payment", 404));
    }

    const result = req.body;
    console.log("Payment Result", result);
    res.status(200).json({
      status: "success",
      data: req.body,
      message: "Successfully paid",
    });
  } else if (req.body.stkCallback.ResultCode === 1037) {
    return next(new AppError("Please ensure your mobile is on!", 401));
  } else if (
    req.body.stkCallback.ResultCode === 1025 ||
    req.body.stkCallback.ResultCode === 999 ||
    req.body.stkCallback.ResultCode === 1025
  ) {
    return next(new AppError("There was an error. Please try again.", 401));
  } else if (req.body.stkCallback.ResultCode === 1032) {
    return next(new AppError("You cancelled the request. Try again!", 401));
  } else if (req.body.stkCallback.ResultCode === 1) {
    return next(
      new AppError("You do not have sufficient funds try again.", 401)
    );
  } else if (req.body.stkCallback.ResultCode === 1019) {
    return next(new AppError("Transaction expired,please try again.", 401));
  } else if (req.body.stkCallback.ResultCode === 1037) {
    return next(new AppError("Request Failed,please try again", 401));
  }
});

exports.verifyTransaction = catchAsync(async (req, res, next) => {});
