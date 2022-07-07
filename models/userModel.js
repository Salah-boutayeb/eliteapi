const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a name"],
    },
    email: {
      type: String,
      required: [true, "please add an email"],
    },
    password: {
      type: String,
      required: [true, "password is required "],
    },
    score: {
      type: "number",
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
