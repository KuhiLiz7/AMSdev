const fs = require("fs");

const User = require("./../models/userModel");

const userData = JSON.parse(
  fs.readFileSync(`${__dirname}/../devdata/users.json`, "utf-8")
);

/**Handler functions */
/**Handler funciton for getting all Users */
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      items: users.length,
      data: users,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

/**Handler function for creating a user (THIS FUNCTIONALITY WILL BE FOR ADMINS/CARETAKERS NOT TENANTS THEMSELVES) */
exports.createUser = async (req, res, next) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      role: req.body.role,
      gender: req.body.gender,
    });

    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

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
exports.updateUser = (req, res, next) => {
  const updatedUsers = userData.map(user => {
    if (user.id === +req.params.id) {
      return { ...user, ...req.body };
    } else {
      return user;
    }
  });

  const updatedUser = updatedUsers.find(user => user.id === +req.params.id);

  fs.writeFile(
    `${__dirname}/devdata/users.json`,
    JSON.stringify(updatedUsers),
    err => {
      if (err)
        res.status(400).json({
          status: "error",
          message: "Error Updating users.",
        });
    }
  );

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
};

/**Handler function for deleting a user */
exports.deleteUser = (req, res, next) => {
  /**Virtual deletion we filter out the user */
  const filteredUsers = userData.filter(user => user.id !== +req.params.id);

  fs.writeFile(
    `${__dirname}/devdata/users.json`,
    JSON.stringify(filteredUsers),
    err => {
      if (err)
        res.status(400).json({
          status: "error",
          message: "Error Deleting user.",
        });
    }
  );

  res.status(204).json({
    status: "success",
    data: null,
  });
};
