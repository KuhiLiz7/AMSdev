const express = require("express");

const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

/**Routes for handling users CRUD OPERATIONS */
const router = express.Router();

router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/validateToken").post(authController.tokenValidate);
router.route("/resetPassword").post(authController.resetPassword);

router.route("/updatePassword").post(authController.updatePassword);

router.route("/getUser").get(userController.getUser);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);

router.route("/me").get(authController.getCurrentUser);

router
  .route("/")
  .get(authController.protect, userController.getAllUsers)
  .post(
    authController.protect,
    authController.restrictTo("admin", "caretaker", "manager"),
    userController.createUser
  );

router
  .route("/:id")
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
