const mongoose = require("mongoose");
const clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  clientTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "client_type",
    required: true,
  },

  email: {
    type: String,
  },

  telephone: {
    type: String,
  },

  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },

  patronymic: {
    type: String,
  },

  documentType: {
    type: String,
  },

  documentSerial: {
    type: String,
  },

  documentNumber: {
    type: String,
  },

  documentDate: {
    type: Date,
  },

  documentIssuedBy: {
    type: String,
  },

  clientAdress: {
    type: String,
  },

  inn: {
    type: String,
  },

  kpp: {
    type: String,
  },

  ogrn: {
    type: String,
  },

  passwordHash: {
    type: String,
  },

  slClientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sl_client",
    required: true,
  },
});

exports.client = mongoose.model("client", clientSchema);
