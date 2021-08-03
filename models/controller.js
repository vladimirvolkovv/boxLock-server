const mongoose = require("mongoose");
const controllerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: false,
  },
  unitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "unit",
    required: true,
  },
});

exports.controller = mongoose.model("controller", controllerSchema);
