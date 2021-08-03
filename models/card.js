const mongoose = require("mongoose");
const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  cardType: {
    type: String,
  },

  unitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "unit",
    required: true,
  },
});

exports.card = mongoose.model("card", cardSchema);
