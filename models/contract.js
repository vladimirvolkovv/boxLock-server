const mongoose = require("mongoose");
const contractSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
  },

  unitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "unit",
    required: true,
  },

  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "client",
    required: true,
  },
  boxId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "box",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  finishDate: {
    type: Date,
    required: true,
  },
  paidBefore: {
    type: Date,
  },
  statusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "contract_status",
    required: true,
  },
  contractCardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "contract_card",
  },
  tariff: {
    type: String,
  },
  tariffName: {
    type: String,
  },
  numberOfDays: {
    type: String,
  },
  dayTariff: {
    type: Number,
  },
});

exports.contract = mongoose.model("contract", contractSchema);
