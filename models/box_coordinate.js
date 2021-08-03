const mongoose = require("mongoose");
const BoxCoordinateSchema = mongoose.Schema({
  xt: {
    type: Number,
    required: true,
  },
  yt: {
    type: Number,
    required: true,
  },
  xb: {
    type: Number,
    required: true,
  },
  yb: {
    type: Number,
    required: true,
  },
  boxId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "box",
    required: true,
  },
  unitFloorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "unit_floor",
    required: true,
  },
  unitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "unit",
    required: true,
  },
});

exports.box_coordinate = mongoose.model("box_coordinate", BoxCoordinateSchema);
