const mongoose = require("mongoose");
const clientTypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

exports.client_type = mongoose.model("client_type", clientTypeSchema);
