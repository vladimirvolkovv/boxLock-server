const mongoose = require("mongoose");
const eventSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
});

exports.event = mongoose.model("event", eventSchema);
