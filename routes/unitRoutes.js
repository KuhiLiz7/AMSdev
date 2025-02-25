const express = require("express");

const unitController = require("./../controllers/unitController");

/**Here we are creating a sort of a miniapplication */
const router = express.Router();

router
  .route("/")
  .get(unitController.getAllUnits)
  .post(unitController.createUnit);

router
  .route("/:num")
  .delete(unitController.deleteUnit)
  .patch(unitController.updateUnit)
  .get(unitController.getUnit);

module.exports = router;
