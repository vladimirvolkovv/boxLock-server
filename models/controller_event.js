const mongoose = require("mongoose");
const controllerEventSchema = mongoose.Schema({
  boxId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "box",
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "event",
    required: true,
  },
  eventcode: {
    type: String,
  },

  card: {
    type: String,
  },
  eventDate: { type: Date, default: Date.now() },
});

exports.controller_event = mongoose.model("controller_event", controllerEventSchema);
