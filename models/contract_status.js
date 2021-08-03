const mongoose = require("mongoose");
const contractStatusSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

exports.contract_status = mongoose.model("contract_status", contractStatusSchema);
