const Unit = require("../models/unitModel");
const catchAsync = require("../utils/catchAsync");

/**Routes for handling unit CRUD OPERATIONS */
exports.getUnit = async (req, res) => {
  try {
    const unit = await Unit.findOne({ unitNum: req.params.num });

    res.status(200).json({
      status: "success",
      data: {
        data: unit,
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

exports.createUnit = catchAsync(async (req, res, next) => {
  const unit = await Unit.create({
    unitType: req.body.unitType,
    apartmentUnit: req.body.apartmentUnit,
    unitNum: req.body.unitNum,
    floor: req.body.floor,
    status: req.body.status,
    description: req.body.description,
  });

  console.log(unit);

  res.status(201).json({
    status: "success",
    data: unit,
  });
});

exports.updateUnit = async (req, res) => {
  try {
    const updatedunit = await Unit.findOneAndUpdate(
      {
        unitNum: { $eq: req.params.num },
      },
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      data: updatedunit,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      data: err,
    });
  }
};

exports.getAllUnits = async (req, res) => {
  try {
    const units = await Unit.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      items: units.length,
      data: units,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      data: err,
    });
  }
};

exports.deleteUnit = async (req, res) => {
  try {
    const unit = await Unit.findOneAndDelete({
      _id: req.body.id,
    });

    res.status(204).json({
      status: "success",
      message: "Successfuly deleted unit",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      data: err,
    });
  }
};
