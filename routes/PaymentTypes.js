const { payment_type } = require("../models/payment_type");
const express = require("express");
const router = express.Router();

router.post("/addpaymenttype", async (req, res) => {
  try {
    let findPaymentType = await payment_type.findOne({ name: req.body.name });

    if (findPaymentType) return res.status(400).json({ message: "Тип оплаты с таким названием уже существует!" });

    let newPaymentType = new payment_type({
      name: req.body.name,
    });
    newPaymentType = await newPaymentType.save();

    if (!newPaymentType) return res.status(404).json({ message: "Тип оплаты не может быть создан!" });

    res.status(201).json({ result: newPaymentType });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.get("/getpaymenttypes", async (req, res) => {
  try {
    let findPaymentTypes = await payment_type.find();

    if (!findPaymentTypes) return res.status(400).json({ message: "Типов заказа еще нет!" });

    res.status(201).json({ result: findPaymentTypes });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
