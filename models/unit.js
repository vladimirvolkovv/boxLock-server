const mongoose = require("mongoose");
const UnitSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  slClientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sl_client",
    required: true,
  },
});

exports.unit = mongoose.model("unit", UnitSchema);
