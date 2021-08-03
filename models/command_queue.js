const mongoose = require("mongoose");
const commandQueueSchema = mongoose.Schema({
  boxId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "box",
    required: true,
  },
  commandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "command",
    required: true,
  },
  controllerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "controller",
    required: true,
  },

  card: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now() },
});

exports.command_queue = mongoose.model("command_queue", commandQueueSchema);
