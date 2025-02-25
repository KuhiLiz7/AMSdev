const dotenv = require("dotenv");
const moongose = require("mongoose");

/**Handling synchronous */
process.on("uncaughtException", err => {
  console.log("UNCAUGHT EXCEPTION 💣 SHTTING DOWN!");
  console.log(err.name, err.message);

  process.exit(1);
});

/**Initialising out DOTENV package */
// dotenv.config({ path: "./config.env" }); (If you have another name apart from .env)
dotenv.config();

/**Connect to the database using mongoose Driver. */
const url = process.env.MONGODB_URL.replace(
  "<DB_USERNAME>",
  process.env.MONGODB_USERNAME
).replace("<DB_PASSWORD>", process.env.MONGODB_PASSWORD);

moongose.connect(url).then(() => {
  console.log("Connected to the database successfully😊!");
});

const app = require("./app");

/**Here we are starting up the server */
const server = app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(
    "This is your express application running on port ",
    process.env.PORT
  );
});

/**Global error handling for asynchronous code */
process.on("unhandledRejection", (err, promise) => {
  console.log("UNHANDLED REJECTION! 💣  SHUTTING DOWN");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
