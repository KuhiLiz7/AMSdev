const dotenv = require("dotenv");
const moongose = require("mongoose");

const app = require("./app");

/**Initialising out DOTENV package */
dotenv.config();

/**Connect to the database using mongoose Driver. */
const url = process.env.MONGODB_URL.replace(
  "<DB_USERNAME>",
  process.env.MONGODB_USERNAME
).replace("<DB_PASSWORD>", process.env.MONGODB_PASSWORD);

moongose
  .connect(url)
  .then(() => {
    console.log("Connected to the database successfully😊!");
  })
  .catch(err => {
    console.log("Failed to connect to DB");
  });

/**Here we are starting up the server */
app.listen(process.env.PORT, () => {
  console.log("This is your express application running on port 8000");
});
