const mongoose = require("mongoose");
const momentTZ = require("moment-timezone");
const dateMoscow = momentTZ.tz(Date.now(), "Europe/Moscow");
const controllerLocationSchema = mongoose.Schema({
  installationTime: { type: Date, default: dateMoscow },

  unitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "unit",
    required: true,
  },
  boxId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "box",
    required: true,
  },
  controllerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "controller",
    required: true,
  },
});

exports.controllerLocation = mongoose.model("controllerLocation", controllerLocationSchema);
