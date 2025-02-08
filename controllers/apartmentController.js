/**Routes for handling apartment CRUD OPERATIONS */

exports.getApartment = (req, res) => {
  res.status(200).json({
    status: "success",
    data: null,
    message: "This route is not implemented!",
  });
};

exports.createApartment = (req, res) => {
  res.status(201).json({
    status: "success",
    data: null,
    message: "Apartment data added successfully!",
  });
};

exports.updateApartment = (req, res) => {
  res.status(200).json({
    status: "success",
    data: null,
    message: "This be the route for handling updating apartment data",
  });
};

exports.getAllApartments = (req, res) => {
  res.status(200).json({
    status: "success",
    data: null,
    message: "This route is not implemented!",
  });
};

exports.deleteApartment = (req, res) => {
  res.status(200).json({
    status: "success",
    data: null,
  });
};
