const express = require("express");

const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

/**Routes for handling users CRUD OPERATIONS */
const router = express.Router();

router.get("/getUser", userController.getUser);
router.post("/login", authController.login);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
