const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");
const apartmentsRouter = require("./routes/apartmentRoutes");
const errorController = require("./controllers/errorController");

const app = express();

/**GLOBAL MIDDLEWARES */
/**1) Logger middleware for logging http request on the server */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
console.log(process.env.NODE_ENV);
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

/**GLOBAL HANDLING OF UNHANDLED ROUTES */
app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "error",
    message: `Resource ${req.baseUrl} could not be found on this server! `,
  });
});

/** GLOBAL ERROR HANDLER MIDDLEWARE*/
app.use(errorController);

module.exports = app;
