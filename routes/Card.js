const { card } = require("../models/card");
const { unit } = require("../models/unit");
const express = require("express");
const router = express.Router();

router.post("/addcard/:unit", async (req, res) => {
  try {
    let unitForSearch = await unit.findOne({ name: req.params.unit });
    let findCard = await card.findOne({ name: req.body.name, unitId: unitForSearch._id });

    if (findCard) return res.status(400).json({ message: "Такая карта уже существует!" });

    let newCard = new card({
      name: req.body.name,
      cardType: req.body.cardType,
      unitId: unitForSearch._id,
    });
    newCard = await newCard.save();

    if (!newCard) return res.status(404).json({ message: "Карта не может быть создана!" });

    res.status(201).json({ result: newCard });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.get("/getcards/:unit", async (req, res) => {
  try {
    // console.log(req.params.unit);
    let unitForSearch = await unit.findOne({ name: req.params.unit });

    let allCards = await card.find({ unitId: unitForSearch._id }).populate({ path: "unitId", select: "name" });

    if (!allCards) return res.status(404).send("Карт пока нет!");

    res.status(200).json({ result: allCards });
    //console.log(controllerLocations);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
