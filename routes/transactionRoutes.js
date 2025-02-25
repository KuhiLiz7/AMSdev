const express = require("express");
const transactionController = require("../controllers/transactionController");

const router = express.Router();

router.route("/payment").post(transactionController.getTransaction);
router.route("/callback").post(transactionController.getCallback);

router.route("/confirm-payment").post(transactionController.verifyTransaction);

module.exports = router;
