const mongoose = require("mongoose");
const occupiedBoxSchema = mongoose.Schema({
  boxId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "box",
    required: true,
  },
  contractId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "contract",
    required: true,
  },
});

exports.occupied_box = mongoose.model("occupied_box", occupiedBoxSchema);
