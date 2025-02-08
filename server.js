const dotenv = require("dotenv");

const app = require("./app");

/**Initialising out DOTENV package */
dotenv.config();

/**Here we are starting up the server */
app.listen(process.env.PORT, () => {
  console.log("This is your express application running on port 8000");
});
