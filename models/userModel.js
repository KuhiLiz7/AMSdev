const moongose = require("mongoose");

/**Creating user Schema */
const userSchema = new moongose.Schema({
  firstName: {
    type: String,
    required: [true, "A user must contain firstName"],
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "A user must have a valid email!"],
  },
  password: {
    type: String,
    default: "Userlogs@123",
  },
  passwordConfirm: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\+?[0-9]{1,4}?[-.\s]?\(?[0-9]{1,3}?\)?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/.test(
          v
        );
      },
      message: props => `${props.value}: is not a valid number!`,
    },
  },
  role: {
    type: String,
    default: "user",
    enum: ["manager", "admin", "tenant", "caretaker"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  profilePicture: {
    type: String,
  },
});

const User = moongose.model("User", userSchema);

module.exports = User;
