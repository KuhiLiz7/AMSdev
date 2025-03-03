const multer = require("multer");
const Apartment = require("./../models/apartmentModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/apartments");
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];
    cb(null, `apartment-${Date.now()}.${extension}`);
  },
});

/**Testing a unique kind of a file which you expect being uploaded */
const multerFilter = (req, file, cb) => {
  console.log(req, file);
  if (file.mimetype.startsWith("image") || file.type.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image!.Please upload only images", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadApartmentPhoto = upload.single("photo");

/**Routes for handling apartment CRUD OPERATIONS */
exports.getApartment = async (req, res) => {
  try {
    const apartment = await Apartment.findOne({
      apartmentNum: req.params.num,
    });

    res.status(200).json({
      status: "success",
      data: {
        data: apartment,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      data: err,
    });
  }
};

exports.createApartment = async (req, res) => {
  try {
    let queryObj = "";

    if (req.file) queryObj = { ...req.body, photo: req.file.filename };
    else queryObj = req.body;

    const apartment = await Apartment.create(queryObj);

    res.status(201).json({
      status: "success",
      data: apartment,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err,
    });
  }
};

exports.updateApartment = catchAsync(async (req, res, next) => {
  const apartment = await Apartment.findOne({
    apartmentNum: { $eq: req.params.num },
  });

  if (!apartment) {
    return next(new AppError("No apartment with that ID", 404));
  }

  console.log(req.file);

  const updateData = {};
  if (req.body.name !== undefined) updateData.name = req.body.name;
  if (req.body.location !== undefined) updateData.location = req.body.location;
  if (req.body.floors !== undefined) updateData.floors = req.body.floors;
  if (req.body.units !== undefined) updateData.units = req.body.units;
  if (req.body.apartmentType !== undefined)
    updateData.apartmentType = req.body.apartmentType;
  if (req.body.description !== undefined)
    updateData.description = req.body.description;
  if (req.file) updateData.photo = req.file.filename;

  console.log(updateData);

  const updatedApartment = await Apartment.findOneAndUpdate(
    {
      apartmentNum: { $eq: req.params.num },
    },
    updateData,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedApartment,
  });
});

exports.getAllApartments = async (req, res) => {
  try {
    const apartments = await Apartment.find().sort({ apartmentNum: -1 });

    res.status(200).json({
      status: "success",
      items: apartments.length,
      data: apartments,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      data: err,
    });
  }
};

exports.deleteApartment = async (req, res) => {
  try {
    const apartment = await Apartment.deleteOne({
      apartmentNum: req.params.num,
    });

    res.status(204).json({
      status: "success",
      message: "Successfuly deleted apartment",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      data: err,
    });
  }
};
