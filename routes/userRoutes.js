const express = require("express");

const userController = require("./../controllers/userController");

/**Routes for handling users CRUD OPERATIONS */
const router = express.Router();

router.get("/getUser", userController.getUser);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
