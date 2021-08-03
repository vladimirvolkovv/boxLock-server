const mongoose = require("mongoose");
const slClientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  contract: {
    type: String,
    required: true,
  },

  isActive: {
    type: Boolean,
    required: true,
  },
});

exports.sl_client = mongoose.model("sl_client", slClientSchema);
