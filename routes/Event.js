const { event } = require("../models/event");
const express = require("express");
const router = express.Router();

router.post("/addevent", async (req, res) => {
  try {
    let findEvent = await event.findOne({ code: req.body.code });

    if (findEvent) return res.status(400).json({ message: "Событие с таким названием уже существует!" });

    let newEvent = new event({
      name: req.body.name,
      code: req.body.code,
    });
    newEvent = await newEvent.save();

    if (!newEvent) return res.status(404).json({ message: "Событие не может быть создана!" });

    res.status(201).json({ result: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
