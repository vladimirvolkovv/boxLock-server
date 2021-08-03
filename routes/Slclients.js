const { sl_client } = require("../models/sl_client");
const express = require("express");
const router = express.Router();

router.post("/addclients", async (req, res) => {
  try {
    let findSlClient = await sl_client.findOne({ name: req.body.name });
    if (findSlClient) return res.status(400).json({ message: "Клиент с таким именем существует!" });

    let client = new sl_client({
      name: req.body.name,
      contract: req.body.contract,
      isActive: true,
    });
    client = await client.save();

    if (!client) return res.status(404).send("Клиент не может быть создан!");

    res.status(201).json({ result: client });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.get("/allclients", async (req, res) => {
  try {
    let allSlClients = await sl_client.find();

    if (!allSlClients) return res.status(404).send("Клиентов пока нет");

    res.status(200).json({ result: allSlClients });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.put("/updateclient/:id", async (req, res) => {
  try {
    let client = await sl_client.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, contract: req.body.contract, isActive: req.body.isActive },
      { new: true }
    );
    if (!client) return res.status(404).send("Клиент не может быть изменен!");
    res.status(200).json({ result: client });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
