const { box } = require("../models/box");
const { unit } = require("../models/unit");
const { unit_floor } = require("../models/unit_floor");
const express = require("express");
const router = express.Router();

router.post("/addbox/:unit", async (req, res) => {
  try {
    console.log(req.body);
    let findBox = await box.findOne({ name: req.body.name });
    // let findUnitId = await unit.findOne({ name: req.body.unitId.name });
    let findUnitForNewBox = await unit.findOne({ name: req.params.unit });
    let findFloor = await unit_floor.findOne({ name: req.body.floorId.name, unitId: findUnitForNewBox._id });
    if (findBox) return res.status(400).json({ message: "Бокс с таким номером уже существует!" });

    let newBox = new box({
      name: req.body.name,
      size: req.body.size,
      width: req.body.width,
      height: req.body.height,
      length: req.body.length,
      sizeType: req.body.sizeType,
      unitId: findUnitForNewBox._id,
      floorId: findFloor._id,
    });
    newBox = await newBox.save();

    if (!newBox) return res.status(404).send("Бокс не может быть добавлен!");

    res.status(201).json({ result: newBox });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
    console.log(error);
    console.log(error);
  }
});

router.get("/getboxes/:unit/:floor*?", async (req, res) => {
  try {
    if (!req.params.floor) {
      let unitForSearch = await unit.findOne({ name: req.params.unit });
      let allBoxes = await box
        .find({ unitId: unitForSearch._id })
        .sort({ name: 1 })
        .populate("unitId")
        .populate("floorId");
      if (!allBoxes) return res.status(404).send("Боксов пока нет");

      res.status(200).json({ result: allBoxes });
    } else if (req.params.floor) {
      let unitForSearch = await unit.findOne({ name: req.params.unit });
      let findFloor = await unit_floor.findOne({ name: req.params.floor, unitId: unitForSearch._id });
      let allBoxes = await box
        .find({ unitId: unitForSearch._id, floorId: findFloor._id })
        .sort({ name: 1 })
        .populate("unitId")
        .populate("floorId");

      if (!allBoxes) return res.status(404).send("Боксов пока нет");

      res.status(200).json({ result: allBoxes });
    }
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.get("/getboxesforlocation/:unit", async (req, res) => {
  try {
    // console.log(req.params.unit);
    let unitForSearch = await unit.findOne({ name: req.params.unit });
    let allBoxes = await box.find({ unitId: unitForSearch._id }).select("name");
    if (!allBoxes) return res.status(404).send("Боксов пока нет");
    // console.log(allBoxes);

    res.status(200).json({ result: allBoxes });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.delete("/deletebox/:id", async (req, res) => {
  try {
    let boxForDelete = await box.findByIdAndRemove(req.params.id);

    if (!boxForDelete) return res.status(404).send("Бокса с таким id не существует!");

    res.status(200).json({ message: "Бокс успешно удален!" });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.put("/putbox/:id", async (req, res) => {
  try {
    let findUnitId = await unit.findOne({ name: req.body.unitId.name });
    let findBoxWithName = await box.findOne({ name: req.body.name });
    let findFloor = await unit_floor.findOne({ name: req.body.floorId.name, unitId: findUnitId._id });
    if (findBoxWithName && findBoxWithName._id != req.params.id)
      return res.status(404).json({ message: "Бокс с таким наименованием уже существует!" });
    let boxForUpdate = await box.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        size: req.body.size,
        width: req.body.width,
        height: req.body.height,
        length: req.body.length,
        sizeType: req.body.sizeType,
        unitId: findUnitId._id,
        floorId: findFloor._id,
      },
      { new: true }
    );

    if (!boxForUpdate) return res.status(404).send("Бокса с таким id не существует!");

    res.status(200).json({ message: "Бокс успешно изменен!" });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
