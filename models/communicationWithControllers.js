const mongoose = require("mongoose");
const communicationWithControllersSchema = mongoose.Schema({
  createdAt: { type: Date, default: Date.now() },

  type: {
    type: String,
    required: true,
  },

  // ping: {
  //   type: String,
  //   required: true,
  // },

  controllerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "controller",
    required: true,
  },

  boxId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "box",
    required: true,
  },

  unitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "unit",
    required: true,
  },

  currentStatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "event",
  },
});

exports.communicationWithController = mongoose.model("communicationWithController", communicationWithControllersSchema);
