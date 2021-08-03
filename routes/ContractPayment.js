const { contract_payment } = require("../models/contract_payment");
const { contract_calculation } = require("../models/contract_calculation");
const { contract_order } = require("../models/contract_order");
const { contract } = require("../models/contract");

const express = require("express");
const router = express.Router();

router.post("/addcontractpayment", async (req, res) => {
  try {
    let newContractPayment = new contract_payment({
      name: req.body.name,
      createdDate: req.body.createdDate,
      paymentTypeId: req.body.paymentType,
      contractOrderId: req.body.contractOrderId,
      contractId: req.body.contractId,
      total: req.body.total,
    });
    newContractPayment = await newContractPayment.save();

    let newContractCalculation = new contract_calculation({
      actionType: "Приход",
      summ: req.body.total,
      contractPaymentId: newContractPayment._id,
    });

    newContractCalculation = await newContractCalculation.save();

    let contractOrderForPayment = await contract_order.findOneAndUpdate(
      { _id: req.body.contractOrderId },
      { contractOrderStatus: "Оплачен" },
      { new: true }
    );

    let ContractOrderForSearch = await contract_order.findOne({ _id: req.body.contractOrderId });

    if (ContractOrderForSearch.orderTypeId !== "60769389f22a444db0593dcc") {
      let contractForUpdate = await contract.findOneAndUpdate(
        { _id: req.body.contractId },
        { paidBefore: ContractOrderForSearch.finishPeriodDate },
        { new: true }
      );
    }

    if (!newContractPayment) return res.status(404).json({ message: "Договор не может быть создан!" });

    res.status(201).json({ result: newContractPayment });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
    console.log(error);
  }
});

router.get("/getcontractpayments/:contractid", async (req, res) => {
  try {
    // console.log(req.params.unit);

    let allContractPayments = await contract_payment
      .find({ contractId: req.params.contractid })
      .populate({ path: "paymentTypeId", select: "name" })
      .populate({ path: "contractOrderId", select: "name" });

    if (!allContractPayments) return res.status(404).send("Счетов по договору пока нет!");

    res.status(200).json({ result: allContractPayments });
    //console.log(controllerLocations);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
