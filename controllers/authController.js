const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { promisify } = require("util");

const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendMail = require("../utils/email");
const Session = require("../models/sessionModel");

/**TODO SETTING UP COOKIE */

const generateJWTToken = user => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

const createSendToken = (user, statusCode, res) => {
  const token = generateJWTToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure: true,(only in production https)
    httpOnly: true,
    sameSite: "Lax",
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });

  return token;
};

/**Here we are promisifying jwt */
const jwtVerify = promisify(jwt.verify);

exports.protect = catchAsync(async (req, res, next) => {
  /**Check first if there is a token */
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    /**authenticating users based on tokens sent by cookies */
    token = req.cookies.jwt;
  }

  if (!token) {
    next(
      new AppError(
        "You are not logged in.Please log in to perform this action!",
        401
      )
    );
  }

  /**Verify whether the token is valid! */
  const checkValidToken = await jwtVerify(token, process.env.JWT_SECRET);

  //Check payload for logged in user
  const user = await User.findById(checkValidToken.id);

  req.user = user;
  next();
});

exports.getCurrentUser = async (req, res, next) => {
  let token;

  if (req.cookies.jwt) {
    token = await jwtVerify(req.cookies.jwt, process.env.JWT_SECRET);
  }

  if (!token) {
    return next(new AppError("You are not logged in."));
  }

  const user = await User.findById(token.id);

  res.status(200).json({
    status: "success",
    data: {
      user: user,
    },
  });
};

exports.login = catchAsync(async (req, res, next) => {
  /**HERE WE WANT TO LOG IN A USER TO THE SYSTEM */

  /**CHECK IF USER EXISTS */
  const user = await User.findOne({ email: req.body.email });

  /**WE shall be using the instance method for verifying the encrypted passwords */
  if (
    !user ||
    !(await user.checkCorrectPassword(req.body.password, user.password))
  ) {
    return next(new AppError("Incorrect email or password!", 401));
  }

  /**IF EXISTING,CREATE A JWT TOKEN */

  const token = createSendToken(user, 200, res);

  console.log(token);

  /**create user session on the db */
  const session = await Session.create({
    userId: user._id,
    token,
    expiresAt: new Date(
      Date.now() + process.env.SESSION_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
  });

  /**SEND BACK THE RESPONSE(USER) WITH THE JWT TOKEN */
  req.user = user;
});

exports.logout = (req, res) => {
  res.cookie("jwt", "Logged out", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
};

/**Limit some actions to some specific people */
exports.restrictTo = (...users) => {
  return (req, res, next) => {
    /**Check if user's role is part of the restricted arrays */
    const includes = users.includes(req.user.role);

    if (!includes) {
      next(new AppError("You are not allowed to perform this action", 401));
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  /**Check first if a user exists in the database */
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new AppError(
        "You do not have an account with us please contact admin.",
        401
      )
    );
  }

  /**Create a random JWT token */
  const token = user.createPasswordResetToken();
  /**Since we are using instance method on the document plus manipulation of the document properties,we need to call save method. */
  await user.save();

  /**Send it back as an email or TEXT(TBD) */
  const passwordResetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword`;

  const message = `Forgot your password ? Enter this code ${token} to confirm password reset request.\n
  Update you password here ${passwordResetUrl} `;

  try {
    await sendMail({
      email: user.email,
      subject: "Password reset initiated. Valid for (10)min",
      message: message,
    });

    res.status(200).json({
      status: "sucess",
      message: "Successfully sent the email.",
    });
  } catch (err) {
    /**If there was an error sending the email,we set the properties to undefined! */
    this.passwordResetToken = undefined;
    this.passwordResetExpiresIn = undefined;
    await user.save({ validateBeforeSave: true });

    return next(
      new AppError(
        "There was an error sending the email please try again later.",
        500
      )
    );
  }
});

/**middleware for validating token from user input */
exports.tokenValidate = catchAsync(async (req, res, next) => {
  const userInputHash = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: userInputHash,
    // passwordResetExpires: { $gt: Date.now() },
  });

  /**Here we shall be comparing the hashes saved in the DB and user input */
  const validUserToken = crypto.timingSafeEqual(
    Buffer.from(user.passwordResetToken, "hex"),
    Buffer.from(userInputHash, "hex")
  );

  if (!validUserToken) {
    return next(new AppError("Invalid or expired code!", 400));
  }

  res.status(200).json({
    status: "success",
    message: "successfull validation",
    hash: userInputHash,
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // MORE PERMANENT SOLUTION TO BE DETERMINED
  /**Get the user based on the password resetToken */
  const user = await User.findOne({
    passwordResetToken: req.headers.hash,
    // passwordResetExpires: { $gt: Date.now() },
  });

  /**If there is a user and the password reset token has not epired,update user's password */
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpiresIn = undefined;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "successfully updated your password.",
  });

  /**In this case we could have redirected the user to the application and assign a new JWT but we shall require a user to login again */
});

exports.updatePassword = (req, res, next) => {};
