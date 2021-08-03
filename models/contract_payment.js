const mongoose = require("mongoose");
const contractPaymentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
  },

  total: {
    type: Number,
    required: true,
  },

  paymentTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "payment_type",
    required: true,
  },

  contractOrderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "contract_order",
    required: true,
  },

  contractId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "contract",
    required: true,
  },
});

exports.contract_payment = mongoose.model("contract_payment", contractPaymentSchema);
