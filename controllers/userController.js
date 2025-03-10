const Unit = require("../models/unitModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("./../models/userModel");

/**Handler functions */
/**Handler funciton for getting all Users */

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().sort({ createdAt: -1 }).populate("unit");

  res.status(200).json({
    status: "success",
    items: users.length,
    data: {
      data: users,
    },
  });
});

/**Handler function for creating a user (THIS FUNCTIONALITY WILL BE FOR ADMINS/CARETAKERS NOT TENANTS THEMSELVES) */
exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
    gender: req.body.gender,
  });

  res.status(201).json({
    status: "success",
    data: {
      data: newUser,
    },
  });
});

/**Handler funciton for getting a user */
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email });

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

/**Handler function for updating user data */
exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    if (updatedUser === null) throw new Error(err);

    res.status(200).json({
      status: "success",
      data: {
        data: updatedUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

/**Handler function for deleting a user */
exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};

exports.assignUnitTenant = async (req, res, next) => {
  /**First we need to check whether the user exists and is active and is a tenant */
  const user = await User.findById(req.body.tenantId);

  if (user.role !== "tenant") {
    return next(new AppError("You can only assign tenants a unit!", 400));
  }

  const unit = await Unit.findById(req.body.unit);

  if (unit.tenant && unit.tenant.toString() !== req.body.tenantId.toString()) {
    return next(
      new AppError("This unit is already assigned to another tenant!", 400)
    );
  }

  /**Update the unit's data */
  const updatedUser = await User.findOneAndUpdate(
    { _id: { $eq: req.body.tenantId } },
    { $set: { paidRent: req.body.paidRent, unit: req.body.unit } },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
};
