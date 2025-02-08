const fs = require("fs");

const userData = JSON.parse(
  fs.readFileSync(`${__dirname}/../devdata/users.json`, "utf-8")
);

/**Handler functions */
/**Handler funciton for getting all Users */
exports.getAllUsers = (req, res, next) => {
  res.status(200).json({
    status: "success",
    items: userData.length,
    data: userData,
    message: "This will display all users and their roles",
  });
};

/**Handler function for creating a user */
exports.createUser = (req, res, next) => {
  const id = userData[userData.length - 1].id + 1;
  const newUser = { ...req.body, id: id };
  userData.push(newUser);

  fs.writeFile(
    `${__dirname}/devdata/users.json`,
    JSON.stringify(userData),
    err => {
      if (err)
        res.status(400).json({
          status: "error",
          message: "Error performing write operations.",
        });
    }
  );

  res.status(201).json({
    status: "success",
    data: newUser,
  });
};

/**Handler funciton for getting a user */
exports.getUser = (req, res, next) => {
  const user = userData.filter(u => u.id === req.params.id * 1);

  res.status(200).json({
    status: "success",
    data: user,
    message: "This will display a specifi user.",
  });
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
