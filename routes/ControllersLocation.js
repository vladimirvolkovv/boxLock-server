const { box } = require("../models/box");
const { unit } = require("../models/unit");
const { controllerLocation } = require("../models/controllerLocation");
const { controller } = require("../models/controller");

const express = require("express");
const moment = require("moment");
const momentTZ = require("moment-timezone");
const dateMoscow = momentTZ.tz(Date.now(), "Europe/Moscow");
const router = express.Router();

//tDate = moment().format("YYYY-MM-DD HH:mm:ss");
//utcDate = moment.utc().toDate();

router.post("/addcontrollerlocation/:unit", async (req, res) => {
  try {
    let findUnitId = await unit.findOne({ name: req.params.unit });

    let findBox = await box.findOne({ name: req.body.boxId.name, unitId: findUnitId._id });
    let findControllerId = await controller.findOne({ name: req.body.controllerId.name });
    let findControllerLocation = await controllerLocation.findOne({
      unitId: findUnitId._id,
      controllerId: findControllerId._id,
      boxId: findBox._id,
    });

    if (findControllerLocation) return res.status(400).json({ message: "Уже есть строка с такими данными!" });

    let newControllerLocation = new controllerLocation({
      unitId: findUnitId._id,
      controllerId: findControllerId._id,
      boxId: findBox._id,
    });
    newControllerLocation = await newControllerLocation.save();

    if (!newControllerLocation) return res.status(404).send(" не может быть добавлен!");

    res.status(201).json({ result: newControllerLocation });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
    console.log(error.message);
  }
});

router.get("/getcontrollerlocation/:unit", async (req, res) => {
  try {
    // console.log(req.params.unit);
    let unitForSearch = await unit.findOne({ name: req.params.unit });

    let controllerLocations = await controllerLocation
      .find({ unitId: unitForSearch._id })
      .sort({ name: 1 })
      .populate({ path: "unitId", select: "name" })
      .populate({ path: "boxId", select: "name" })
      .populate({ path: "controllerId", select: "name" });

    if (!controllerLocations) return res.status(404).send("Подсоединенных боксов пока нет!");

    res.status(200).json({ result: controllerLocations });
    //console.log(controllerLocations);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
