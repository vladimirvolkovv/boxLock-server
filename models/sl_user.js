const mongoose = require("mongoose");
const slUserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  passwordHash: {
    type: String,
    required: true,
  },

  // slClientId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "sl_client",
  // },
});

exports.sl_user = mongoose.model("sl_user", slUserSchema);
