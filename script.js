const express = require("express");
const fs = require("fs");

const app = express();

/**Middleware for enabling requests parsing with JSON payloads since its based on bodyparser */
app.use(express.json());

/**Routes for handling apartment CRUD OPERATIONS */
app.get("/api/v1/apartments", (req, res) => {
  res.status(200).json({
    status: "success",
    data: null,
    message: "This will display all apartments Data",
  });
});

app.get("/api/v1/apartments/:id", (req, res) => {
  res.status(200).json({
    status: "success",
    data: null,
    message: "This will display all apartments Data",
  });
});

app.post("/api/v1/apartments", (req, res) => {
  res.status(201).json({
    status: "success",
    data: null,
    message: "Apartment data added successfully!",
  });
});

app.patch("/api/v1/apartments/:id", (req, res) => {
  res.status(200).json({
    status: "success",
    data: null,
    message: "This be the route for handling updating apartment data",
  });
});

app.delete("/api/v1/apartments/:id", (req, res) => {
  res.status(200).json({
    status: "success",
    data: null,
  });
});

const userData = JSON.parse(
  fs.readFileSync(`${__dirname}/devdata/users.json`, "utf-8")
);

/**Routes for handling users CRUD OPERATIONS */
app.get("/api/v1/users", (req, res) => {
  res.status(200).json({
    status: "success",
    items: userData.length,
    data: userData,
    message: "This will display all users and their roles",
  });
});

app.get("/api/v1/users/:id", (req, res) => {
  const user = userData.filter(u => u.id === req.params.id * 1);

  res.status(200).json({
    status: "success",
    data: user,
    message: "This will display a specifi user.",
  });
});

app.post("/api/v1/users", (req, res) => {
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
});

app.patch("/api/v1/users/:id", (req, res) => {
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
});

app.delete("/api/v1/users/:id", (req, res) => {
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
});

app.listen(8000, () => {
  console.log("This is your express application running on port 3000");
});
