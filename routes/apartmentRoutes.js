const express = require("express");

const apartmentsController = require("./../controllers/apartmentController");

/**Here we are creating a sort of a miniapplication */
const router = express.Router();

router
  .route("/")
  .get(apartmentsController.getAllApartments)
  .post(
    apartmentsController.uploadApartmentPhoto,
    apartmentsController.createApartment
  );

router
  .route("/:num")
  .delete(apartmentsController.deleteApartment)
  .patch(
    apartmentsController.uploadApartmentPhoto,
    apartmentsController.updateApartment
  )
  .get(apartmentsController.getApartment);

module.exports = router;
