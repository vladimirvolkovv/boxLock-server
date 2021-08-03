const mongoose = require("mongoose");
const paymentTypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

exports.payment_type = mongoose.model("payment_type", paymentTypeSchema);
