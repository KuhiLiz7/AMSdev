const express = require("express");

const userRouter = require("./routes/userRoutes");
const apartmentsRouter = require("./routes/apartmentRoutes");

const app = express();

/**Middleware for enabling requests parsing with JSON payloads since its based on bodyparser */
app.use(express.json());

/**Custom middleware */
app.use((req, res, next) => {
  console.log("Hello there from this middleware 😂");

  next();
});

/**Mounting the router function to the application as middleware */
app.use("/api/v1/users", userRouter);
app.use("/api/v1/apartments", apartmentsRouter);

module.exports = app;
