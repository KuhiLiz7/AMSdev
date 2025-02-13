const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

exports.login = async (req, res, next) => {
  try {
    /**HERE WE WANT TO LOG IN A USER TO THE SYSTEM */
    /**CHECK IF USER EXISTS */
    const user = await User.findOne({ email: req.body.email });

    /**WE shall be using the query middleware for verifying the encrypted passwords */
    if (!user || user.password !== req.body.password) {
      throw new Error("Incorrect email or password!");
    }

    /**IF EXISTING,CREATE A JWT TOKEN */
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    /**SEND BACK THE RESPONSE(USER) WITH THE JWT TOKEN */
    req.user = user;
    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
