const { controller_event } = require("../models/controller_event");
const { unit } = require("../models/unit");
const { box } = require("../models/box");
const express = require("express");
const router = express.Router();

router.get("/getcontrollersevents/:id", async (req, res) => {
  try {
    let findClientUnits = await unit.find({ slClientId: req.params.id });
    let findClientBox = await box.find({ unitId: { $in: findClientUnits } });
    //console.log(findClientBox);
    let allControllersEvents = await controller_event
      .find({ boxId: { $in: findClientBox } })
      .populate({ path: "eventId", select: "name" })
      .populate({
        path: "boxId",
        select: "name",
        populate: {
          path: "unitId",
          select: "name",
        },
      });

    if (!allControllersEvents) return res.status(404).send("Данных пока нет!");

    res.status(200).json({ result: allControllersEvents });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.get("/getcontrollerseventsformobileclient/:limit", async (req, res) => {
  try {
    //let findClientUnits = await unit.find({ slClientId: req.params.id });
    let findClientBox = await box.find({ _id: { $in: ["60452568ed9b6c38dcd41ee1", "604677adddf6f32234bc7cb7"] } });

    //console.log(findClientBox);
    let allControllersEvents = await controller_event
      .find({ boxId: { $in: findClientBox } })
      .sort({ eventDate: -1 })
      .limit(Number(req.params.limit))
      .populate({ path: "eventId", select: "name" })
      .populate({
        path: "boxId",
        select: "name",
      });

    if (!allControllersEvents) return res.status(404).send("Данных пока нет!");

    res.status(200).json({ result: allControllersEvents });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
