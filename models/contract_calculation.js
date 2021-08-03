const mongoose = require("mongoose");
const contractCalculationSchema = mongoose.Schema({
  actionType: {
    type: String,
    required: true,
  },
  summ: {
    type: Number,
    required: true,
  },
  contractPaymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "contract_payment",
  },

  contractOrderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "contract_order",
  },
});

exports.contract_calculation = mongoose.model("contract_calculation", contractCalculationSchema);
