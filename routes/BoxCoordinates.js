const { box_coordinate } = require("../models/box_coordinate");
const { occupied_box } = require("../models/occupied_box");
const { unit } = require("../models/unit");
const { box } = require("../models/box");
const express = require("express");
const { unit_floor } = require("../models/unit_floor");
const router = express.Router();
const moment = require("moment");
tDate = moment().format("YYYY-MM-DD HH:mm:ss");

router.post("/addboxcoordinates/:id", async (req, res) => {
  try {
    let unitForSearch = await unit.findOne({ name: req.body.unit, slClientId: req.params.id });
    let unitFloorForSearch = await unit_floor.findOne({ name: req.body.unitFloor, unitId: unitForSearch._id });
    let boxForSearch = await box.findOne({
      name: req.body.boxId.name,
      unitId: unitForSearch._id,
      floorId: unitFloorForSearch._id,
    });

    let newBoxCoordinates = new box_coordinate({
      boxId: boxForSearch._id,
      unitId: unitForSearch._id,
      unitFloorId: unitFloorForSearch._id,
      xt: req.body.xt,
      yt: req.body.yt,
      xb: req.body.xb,
      yb: req.body.yb,
    });
    newBoxCoordinates = await newBoxCoordinates.save();

    if (!newBoxCoordinates) return res.status(404).json({ message: "Невозможно создать запись!" });

    res.status(201).json({ result: newBoxCoordinates });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
    console.log(error);
  }
});

router.get("/getboxcoordinates/:unit/:floor/:currenttime", async (req, res) => {
  try {
    let currentTimePar = req.params.currenttime;

    let unitForSearch = await unit.findOne({ name: req.params.unit });
    let unitFloorForSearch = await unit_floor.findOne({ name: req.params.floor, unitId: unitForSearch._id });
    let test = await box_coordinate.aggregate([
      { $match: { unitId: unitForSearch._id, unitFloorId: unitFloorForSearch._id } },

      {
        $lookup: {
          from: "occupied_boxes",
          localField: "boxId",
          foreignField: "boxId",
          as: "occupied",
        },
      },

      {
        $lookup: {
          from: "contracts",
          localField: "occupied.contractId",
          foreignField: "_id",

          as: "occupiedContract",
        },
      },

      {
        $project: {
          boxId: 1,
          xt: 1,
          yt: 1,
          xb: 1,
          yb: 1,
          occupied: 1,
          // occupiedContract: 1,

          occupiedContract: {
            $filter: {
              input: "$occupiedContract",
              as: "pet",
              cond: {
                $and: [
                  { $gte: ["$$pet.finishDate", new Date(currentTimePar)] },
                  { $lt: ["$$pet.startDate", new Date(currentTimePar)] },
                ],
              },
            },
          },
        },
      },
    ]);

    let test2 = await box_coordinate.populate(test, { path: "boxId" });

    let findBoxCoordinates = await box_coordinate
      .find({ unitId: unitForSearch._id, unitFloorId: unitFloorForSearch._id })
      .populate({
        path: "boxId",
        select: "name",
        populate: {
          path: "floorId",
          select: "name",
        },
      })

      .sort({ name: 1 });
    if (!findBoxCoordinates) return res.status(404).send("Объектов не обнаружено!");

    res.status(201).json({ result: test2 });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
    console.log(error);
  }
});

router.get("/getboxcoordinatesforcommunication/:unit/:floor", async (req, res) => {
  try {
    let unitForSearch = await unit.findOne({ name: req.params.unit });
    let unitFloorForSearch = await unit_floor.findOne({ name: req.params.floor, unitId: unitForSearch._id });
    let test = await box_coordinate.aggregate([
      { $match: { unitId: unitForSearch._id, unitFloorId: unitFloorForSearch._id } },

      {
        $lookup: {
          from: "communicationwithcontrollers",
          localField: "boxId",
          foreignField: "boxId",
          as: "occupied",
        },
      },

      {
        $project: {
          boxId: 1,
          xt: 1,
          yt: 1,
          xb: 1,
          yb: 1,
          occupied: 1,
          // occupiedContract: 1,
        },
      },
    ]);

    let test2 = await box_coordinate.populate(test, { path: "boxId" });

    let findBoxCoordinates = await box_coordinate
      .find({ unitId: unitForSearch._id, unitFloorId: unitFloorForSearch._id })
      .populate({
        path: "boxId",
        select: "name",
        populate: {
          path: "floorId",
          select: "name",
        },
      })

      .sort({ name: 1 });
    if (!findBoxCoordinates) return res.status(404).send("Объектов не обнаружено!");

    res.status(201).json({ result: test2 });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
    console.log(error);
  }
});

router.get("/getboxcoordinatesfortable/:unit/:floor", async (req, res) => {
  try {
    let unitForSearch = await unit.findOne({ name: req.params.unit });
    let unitFloorForSearch = await unit_floor.findOne({ name: req.params.floor, unitId: unitForSearch._id });

    let findBoxCoordinates = await box_coordinate
      .find({ unitId: unitForSearch._id, unitFloorId: unitFloorForSearch._id })
      .populate({
        path: "boxId",
        select: "name",
        populate: {
          path: "floorId",
          select: "name",
        },
      })

      .sort({ name: 1 });
    if (!findBoxCoordinates) return res.status(404).send("Объектов не обнаружено!");

    res.status(201).json({ result: findBoxCoordinates });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
    console.log(error);
  }
});

router.delete("/deleteboxcoordinates/:id", async (req, res) => {
  try {
    let coordinatesForDelete = await box_coordinate.findByIdAndRemove(req.params.id);

    if (!coordinatesForDelete) return res.status(404).send("Координат с таким id не существует!");

    res.status(200).json({ message: "Координаты успешно удалены!" });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
