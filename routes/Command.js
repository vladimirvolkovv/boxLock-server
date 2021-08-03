const { command } = require("../models/command");
const express = require("express");
const router = express.Router();

router.post("/addcommand", async (req, res) => {
  try {
    let findCommand = await command.findOne({ name: req.body.name });

    if (findCommand) return res.status(400).json({ message: "Команда с таким названием уже существует!" });

    let newCommand = new command({
      name: req.body.name,
    });
    newCommand = await newCommand.save();

    if (!newCommand) return res.status(404).json({ message: "Команда не может быть создана!" });

    res.status(201).json({ result: newCommand });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
