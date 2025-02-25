const Apartment = require("./../models/apartmentModel");

/**Routes for handling apartment CRUD OPERATIONS */
exports.getApartment = async (req, res) => {
  try {
    const apartment = await Apartment.findOne({ apartmentNum: req.params.num });

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
    const apartment = await Apartment.create(req.body);

    res.status(201).json({
      status: "success",
      data: apartment,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      data: err,
    });
  }
};

exports.updateApartment = async (req, res) => {
  try {
    const updatedApartment = await Apartment.findOneAndUpdate(
      {
        apartmentNum: { $eq: req.params.num },
      },
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      data: updatedApartment,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      data: err,
    });
  }
};

exports.getAllApartments = async (req, res) => {
  try {
    const apartments = await Apartment.find();

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
