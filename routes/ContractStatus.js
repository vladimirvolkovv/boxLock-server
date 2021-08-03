const { contract_status } = require("../models/contract_status");

const express = require("express");
const router = express.Router();

router.post("/addcontractstatus", async (req, res) => {
  try {
    let findContractStatus = await contract_status.findOne({ name: req.body.name });

    if (findContractStatus) return res.status(400).json({ message: "Статус с таким названием уже существует!" });

    let newContractStatus = new contract_status({
      name: req.body.name,
    });
    newContractStatus = await newContractStatus.save();

    if (!newContractStatus) return res.status(404).json({ message: "Статус не может быть создан!" });

    res.status(201).json({ result: newContractStatus });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.get("/getcontractstatuses", async (req, res) => {
  try {
    let findContractStatus = await contract_status.find();

    if (!findContractStatus) return res.status(400).json({ message: "Статусов еще нет!" });

    res.status(201).json({ result: findContractStatus });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
