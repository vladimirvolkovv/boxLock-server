const mongoose = require("mongoose");
const currentEventSchema = mongoose.Schema({
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

  eventDate: { type: Date, default: Date.now() },
});

exports.current_event = mongoose.model("current_event", currentEventSchema);
