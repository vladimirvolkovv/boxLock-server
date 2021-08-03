const { contract } = require("../models/contract");
const { contract_card } = require("../models/contract_card");
const { occupied_box } = require("../models/occupied_box");
const { unit } = require("../models/unit");
const { client } = require("../models/client");

const express = require("express");
const router = express.Router();

router.post("/addcontract", async (req, res) => {
  try {
    let newContractCards = new contract_card({
      cards: req.body.cards,
    });
    newContractCards = await newContractCards.save();
    let newContract = new contract({
      name: req.body.name,
      clientId: req.body.clientBoxValue,
      unitId: req.body.unit,
      createdDate: req.body.createdDate,
      startDate: req.body.startDate,
      finishDate: req.body.finishDate,
      statusId: req.body.status,
      boxId: req.body.box,
      tariffName: req.body.tariffName,
      tariff: req.body.tariff,
      contractCardId: newContractCards._id,
      numberOfDays: req.body.numberOfDays,
      dayTariff: req.body.dayTariff,
    });
    newContract = await newContract.save();

    let newOccupiedBox = new occupied_box({
      boxId: req.body.box,
      contractId: newContract._id,
    });
    newOccupiedBox = await newOccupiedBox.save();

    if (!newContract) return res.status(404).json({ message: "Договор не может быть создан!" });

    if (!newContractCards) return res.status(404).json({ message: "Карты не могут быть добавлены!" });

    res.status(201).json({ result: newContract });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
    console.log(error);
  }
});

router.get("/getcontracts/:unit", async (req, res) => {
  try {
    // console.log(req.params.unit);
    let unitForSearch = await unit.findOne({ name: req.params.unit });

    let allContracts = await contract
      .find({ unitId: unitForSearch._id })
      .populate({ path: "clientId", select: "name" })
      .populate({ path: "boxId", select: "name" })
      .populate({ path: "statusId", select: "name" });

    if (!allContracts) return res.status(404).send("Договоров пока нет!");

    res.status(200).json({ result: allContracts });
    //console.log(controllerLocations);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.get("/getcontract/:id", async (req, res) => {
  try {
    // console.log(req.params.unit);
    //   let unitForSearch = await unit.findOne({ name: req.params.unit });

    let findContract = await contract
      .findOne({ _id: req.params.id })
      .populate({ path: "clientId", select: "name" })
      .populate({
        path: "boxId",
        populate: {
          path: "floorId",
          select: "name",
        },
      })
      .populate({ path: "statusId", select: "name" })
      .populate({ path: "unitId", select: "name" })
      .populate({ path: "contractCardId" });

    // let findCards = await contract_card.findOne({ contractId: req.params.id });

    if (!findContract) return res.status(404).send("Договора с таким Id не существует!");

    res.status(200).json({ result: findContract });

    //console.log(controllerLocations);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.get("/getcontractsformobile/:clientid", async (req, res) => {
  try {
    // let clientForSearch = await client.findOne({ clientId: req.params.clientid });
    console.log(req.params.clientid);
    let findContracts = await contract
      .find({ clientId: req.params.clientid })
      .populate({ path: "clientId", select: "name" })
      .populate({
        path: "boxId",
        populate: {
          path: "floorId",
          select: "name",
        },
      })
      .populate({ path: "statusId", select: "name" })
      .populate({ path: "unitId", select: "name" });

    // let findCards = await contract_card.findOne({ contractId: req.params.id });

    if (!findContracts) return res.status(404).send("У клиента ещё нет договоров!");

    res.status(200).json({ result: findContracts });

    //console.log(controllerLocations);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
