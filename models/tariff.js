const mongoose = require("mongoose");
const tariffSchema = mongoose.Schema({
  size: {
    type: Number,
    required: true,
  },
  sizeType: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },

  month1price: {
    type: Number,
    required: true,
  },
  month2price: {
    type: Number,
    required: true,
  },
  month3price: {
    type: Number,
    required: true,
  },
  month4price: {
    type: Number,
    required: true,
  },
  month5price: {
    type: Number,
    required: true,
  },
  month6price: {
    type: Number,
    required: true,
  },
  month7price: {
    type: Number,
    required: true,
  },
  month8price: {
    type: Number,
    required: true,
  },
  month9price: {
    type: Number,
    required: true,
  },
  month10price: {
    type: Number,
    required: true,
  },
  month11price: {
    type: Number,
    required: true,
  },
  month12price: {
    type: Number,
    required: true,
  },

  unitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "unit",
    required: true,
  },
});

exports.tariff = mongoose.model("tariff", tariffSchema);
