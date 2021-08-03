const mongoose = require("mongoose");
const contractOrderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
  },
  serviceName: {
    type: String,
    // required: true,
  },
  startPeriodDate: {
    type: Date,
  },
  finishPeriodDate: {
    type: Date,
  },
  numberOfDays: {
    type: Number,
  },
  total: {
    type: Number,
    required: true,
  },
  contractOrderStatus: {
    type: String,
    required: true,
  },

  contractId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "contract",
    required: true,
  },
  orderTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order_types",
    required: true,
  },
});

exports.contract_order = mongoose.model("contract_order", contractOrderSchema);
