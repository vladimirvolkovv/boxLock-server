const { tariff } = require("../models/tariff");
const { unit } = require("../models/unit");
const express = require("express");
const router = express.Router();

router.post("/addtariff/:unit", async (req, res) => {
  try {
    let findUnitId = await unit.findOne({ name: req.params.unit });

    let newTariff = new tariff({
      size: req.body.size,
      sizeType: req.body.sizeType,
      startDate: req.body.startDate,
      month1price: req.body.month1price,
      month2price: req.body.month2price,
      month3price: req.body.month3price,
      month4price: req.body.month4price,
      month5price: req.body.month5price,
      month6price: req.body.month6price,
      month7price: req.body.month7price,
      month8price: req.body.month8price,
      month9price: req.body.month9price,
      month10price: req.body.month10price,
      month11price: req.body.month11price,
      month12price: req.body.month12price,
      unitId: findUnitId._id,
    });
    newTariff = await newTariff.save();

    if (!newTariff) return res.status(404).json({ message: "Такой тариф не может быть создан!" });

    res.status(201).json({ result: newTariff });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.get("/gettariffs/:unit", async (req, res) => {
  try {
    // console.log(req.params.unit);
    let unitForSearch = await unit.findOne({ name: req.params.unit });

    let allTariffs = await tariff.find({ unitId: unitForSearch._id }).populate({ path: "unitId", select: "name" });

    if (!allTariffs) return res.status(404).send("Тарифов пока нет!");

    res.status(200).json({ result: allTariffs });
    //console.log(controllerLocations);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.get("/gettariffforbox/:unit/:size/:sizeType", async (req, res) => {
  try {
    // let unitForSearch = await unit.findOne({ _id: req.params.unit });
    let tariffForSearch = await tariff.findOne({
      unitId: req.params.unit,
      size: req.params.size,
      sizeType: req.params.sizeType,
    });

    if (!tariffForSearch) return res.status(404).send("Тарифа для данных параметров не задано!");

    res.status(200).json({ result: tariffForSearch });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
