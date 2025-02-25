const Apartment = require("./../models/apartmentModel");

/**Routes for handling apartment CRUD OPERATIONS */

exports.getApartment = (req, res) => {
  res.status(200).json({
    status: "success",
    data: null,
    message: "This route is not implemented!",
  });
};

exports.createApartment = async (req, res) => {
  const apartment = await Apartment.create(req.body);
  console.log(apartment);
  // const apartment = Apartment.create({req.body});
  res.status(201).json({
    status: "success",
    data: apartment,
  });
};

exports.updateApartment = (req, res) => {
  res.status(200).json({
    status: "success",
    data: null,
    message: "This be the route for handling updating apartment data",
  });
};

exports.getAllApartments = async (req, res) => {
  const apartments = await Apartment.find();

  res.status(200).json({
    status: "success",
    items: apartments.length,
    data: apartments,
  });
};

exports.deleteApartment = (req, res) => {
  res.status(200).json({
    status: "success",
    data: null,
  });
};
