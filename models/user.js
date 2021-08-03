const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
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

  isAdmin: {
    type: Boolean,
    required: true,
  },

  isRoot: {
    type: Boolean,
    required: true,
  },

  slClientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sl_client",
    required: true,
  },
});

exports.user = mongoose.model("user", userSchema);
