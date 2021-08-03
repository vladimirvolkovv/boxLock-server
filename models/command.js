const mongoose = require("mongoose");
const commandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

exports.command = mongoose.model("command", commandSchema);
