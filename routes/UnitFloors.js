const { unit_floor } = require("../models/unit_floor");
const { unit } = require("../models/unit");
const express = require("express");
const router = express.Router();

router.post("/addunitfloor", async (req, res) => {
  try {
    //let unitForSearch = await unit.findOne({ name: req.params.unit });

    // let findUnitFloor = await unit_floor.findOne({ name: req.body.name, unitId: unitForSearch._id });

    // if (findUnitFloor) return res.status(400).json({ message: "Такой этаж уже существует!" });

    let newUnitFloor = new unit_floor({
      name: req.body.name,
      unitId: req.body.unitId,
      //unitId: unitForSearch._id,
    });
    newUnitFloor = await newUnitFloor.save();

    if (!newUnitFloor) return res.status(404).json({ message: "Этаж не может быть создан!" });

    res.status(201).json({ result: newUnitFloor });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.get("/getunitfloors/:unit", async (req, res) => {
  try {
    let unitForSearch = await unit.findOne({ name: req.params.unit });

    let allUnitFloors = await unit_floor
      .find({ unitId: unitForSearch._id })
      .populate({ path: "unitId", select: "name" });

    if (!allUnitFloors) return res.status(404).send("Этажей пока нет!");

    res.status(200).json({ result: allUnitFloors });
    //console.log(controllerLocations);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
