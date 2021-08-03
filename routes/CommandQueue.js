const { command } = require("../models/command");
const { command_queue } = require("../models/command_queue");
const { controllerLocation } = require("../models/controllerLocation");
const express = require("express");
const router = express.Router();

router.post("/addqueuecommand", async (req, res) => {
  try {
    let findCommand = await command.findOne({ name: req.body.name });

    if (!findCommand) return res.status(400).json({ message: "Такой команды не существует!" });

    let findControllerLocation = await controllerLocation.findOne({ boxId: req.body.boxId });

    let newCommandQueue = new command_queue({
      commandId: findCommand._id,
      boxId: findControllerLocation.boxId,
      controllerId: findControllerLocation.controllerId,
      card: req.body.card,
      createdAt: Date.now(),
    });
    newCommandQueue = await newCommandQueue.save();

    if (!newCommandQueue) return res.status(404).json({ message: "Команда не может быть создана!" });

    res.status(201).json({ result: newCommandQueue });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
    console.log(error);
  }
});

module.exports = router;
