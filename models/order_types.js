const mongoose = require("mongoose");
const orderTypesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

exports.order_types = mongoose.model("order_types", orderTypesSchema);
