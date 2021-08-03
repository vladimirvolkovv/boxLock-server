const mongoose = require("mongoose");
const contractCardSchema = mongoose.Schema({
  cards: [
    {
      cardId: { type: mongoose.Schema.Types.ObjectId, ref: "card" },
      name: String,
    },
  ],
});

exports.contract_card = mongoose.model("contract_card", contractCardSchema);
