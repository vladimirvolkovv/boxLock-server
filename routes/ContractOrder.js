const { contract_order } = require("../models/contract_order");
const { contract_calculation } = require("../models/contract_calculation");

const express = require("express");
const router = express.Router();

router.post("/addcontractorder", async (req, res) => {
  try {
    let newContractOrder = new contract_order({
      name: req.body.name,
      contractId: req.body.contractId,
      createdDate: req.body.createdDate,
      startPeriodDate: req.body.startPeriodDate,
      finishPeriodDate: req.body.finishPeriodDate,
      orderTypeId: req.body.orderTypeId,
      contractOrderStatus: "Выставлен",
      total: req.body.total,
      numberOfDays: req.body.numberOfDays,
    });
    newContractOrder = await newContractOrder.save();

    let newContractCalculation = new contract_calculation({
      actionType: "Расход",
      summ: req.body.total,
      contractOrderId: newContractOrder._id,
    });

    newContractCalculation = await newContractCalculation.save();

    if (!newContractOrder) return res.status(404).json({ message: "Договор не может быть создан!" });

    res.status(201).json({ result: newContractOrder });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
    console.log(error);
  }
});

router.get("/getcontractorders/:contractid", async (req, res) => {
  try {
    // console.log(req.params.unit);

    let allContractOrders = await contract_order
      .find({ contractId: req.params.contractid })
      .populate({ path: "orderTypeId", select: "name" });

    if (!allContractOrders) return res.status(404).send("Счетов по договору пока нет!");

    res.status(200).json({ result: allContractOrders });
    //console.log(controllerLocations);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
