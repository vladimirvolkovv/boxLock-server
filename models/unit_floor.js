const mongoose = require("mongoose");
const UnitFloorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  unitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "unit",
    required: true,
  },
});

exports.unit_floor = mongoose.model("unit_floor", UnitFloorSchema);
