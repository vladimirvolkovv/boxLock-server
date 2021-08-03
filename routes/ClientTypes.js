const { client_type } = require("../models/client_type");
const express = require("express");
const router = express.Router();

router.post("/addclienttype", async (req, res) => {
  try {
    let findClientType = await client_type.findOne({ name: req.body.name });

    if (findClientType) return res.status(400).json({ message: "Тип клиента с таким названием уже существует!" });

    let newClientType = new client_type({
      name: req.body.name,
    });
    newClientType = await newClientType.save();

    if (!newClientType) return res.status(404).json({ message: "Тип клиента не может быть создан!" });

    res.status(201).json({ result: newClientType });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
