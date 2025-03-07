const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { initiatePayRequest } = require("../utils/darajaAPI");

const Transaction = require("./../models/transactionModel");

/**Here we shall be handling all maters transaction */
exports.getTransaction = catchAsync(async (req, res, next) => {
  /**This will be defined as an arbitrary value: FIXME TO BE UPDATED*/
  const amount = req.body.amount;
  const phone = req.body.phone;

  console.log(phone, amount);

  const paymentResponse = await initiatePayRequest(phone, amount);

  res.status(200).json({
    status: "success",
    data: paymentResponse?.ResponseDescription,
  });
});

/**Endpoint for the confirmation of our api request status */
exports.getCallback = catchAsync(async (req, res, next) => {
  const callbackSTK = req.body?.Body.stkCallback;
  const { ResultCode } = req.body?.Body.stkCallback;

  if (!callbackSTK) {
    return res.status(200).json({ message: "Awaiting result" });
  }

  /**If the transaction was successfull,we need to create the transaction in the DB */
  if (ResultCode === 0) {
    const items = callbackSTK.CallbackMetadata?.Item || [];

    const { Amount, MpesaReceiptNumber, TransactionDate, PhoneNumber } =
      items.reduce((acc, item) => {
        acc[item.Name] = item.Value || "";
        return acc;
      }, {});

    const data = await Transaction.create({
      createdAt: TransactionDate,
      amountPaid: Amount,
      mpesatransactionCode: MpesaReceiptNumber,
      phoneNumber: PhoneNumber,
    });

    if (!data) {
      return next(
        new AppError("There was an error creating a transaction", 404)
      );
    }

    res.status(200).json({
      status: "success",
      message: "Successfully paid",
    });
  } else if (ResultCode === 1037) {
    return next(new AppError("Please ensure your mobile is on!", 401));
  } else if (ResultCode === 1025 || ResultCode === 999 || ResultCode === 1025) {
    return next(new AppError("There was an error. Please try again.", 401));
  } else if (ResultCode === 1032) {
    return next(new AppError("You cancelled the request. Try again!", 401));
  } else if (ResultCode === 1) {
    return next(
      new AppError("You do not have sufficient funds try again.", 401)
    );
  } else if (ResultCode === 1019) {
    return next(new AppError("Transaction expired,please try again.", 401));
  } else if (ResultCode === 1037) {
    return next(new AppError("Request Failed,please try again", 401));
  }

  return new AppError("There was an error making payments", 400);
});

/**TODO I guess this will be implemented later */
exports.verifyTransaction = catchAsync(async (req, res, next) => {});
