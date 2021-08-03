const mongoose = require("mongoose");
const boxSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  size: {
    type: Number,
    required: true,
  },

  sizeType: {
    type: String,
    required: true,
  },

  width: {
    type: Number,
  },

  height: {
    type: Number,
  },

  length: {
    type: Number,
  },

  unitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "unit",
    required: true,
  },

  floorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "unit_floor",
  },
});

exports.box = mongoose.model("box", boxSchema);
