const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userLoginSchema = new Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", userLoginSchema);
