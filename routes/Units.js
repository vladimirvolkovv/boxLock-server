const { unit } = require("../models/unit");
const { sl_client } = require("../models/sl_client");
const express = require("express");
const router = express.Router();

router.post("/addunits", async (req, res) => {
  try {
    let findSlClient = await sl_client.findById({ _id: req.body.id });
    if (!findSlClient) return res.status(400).json({ message: "Клиента не существует!" });

    let newUnit = new unit({
      name: req.body.name,
      description: req.body.description,
      slClientId: req.body.id,
    });
    newUnit = await newUnit.save();

    if (!newUnit) return res.status(404).send("Объект не может быть создан!");

    res.status(201).json({ result: newUnit });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
    console.log(error);
  }
});

router.get("/getunits/:id", async (req, res) => {
  try {
    // let findSlClient = await sl_client.findById(req.params.id,{ _id: req.body.id });
    // if (!findSlClient) return res.status(400).json({ message: "Клиента не существует!" });

    let findClientUnits = await unit.find({ slClientId: req.params.id });
    if (!findClientUnits) return res.status(404).send("Объектов не обнаружено!");

    res.status(201).json({ result: findClientUnits });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
    console.log(error);
  }
});

module.exports = router;
