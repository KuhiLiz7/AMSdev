const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");
const apartmentsRouter = require("./routes/apartmentRoutes");

const app = express();

/**GLOBAL MIDDLEWARES */
/**1) Logger middleware for logging http request on the server */
app.use(morgan("dev"));

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

/**GLOBAL HANDLING OF UNHANDLED */
app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "error",
    message: `Resource ${req.baseUrl} could not be found on this server! `,
  });
});

module.exports = app;
