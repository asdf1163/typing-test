const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let progress = new Schema(
  {
    date: { type: Date },
    score: { type: Number},
    time: { type: Number }
  },
  { collection: "progress" }
);