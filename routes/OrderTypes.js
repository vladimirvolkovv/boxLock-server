const { order_types } = require("../models/order_types");
const express = require("express");
const router = express.Router();

router.post("/addordertype", async (req, res) => {
  try {
    let findOrderType = await order_types.findOne({ name: req.body.name });

    if (findOrderType) return res.status(400).json({ message: "Тип заказа с таким названием уже существует!" });

    let newOrderType = new order_types({
      name: req.body.name,
    });
    newOrderType = await newOrderType.save();

    if (!newOrderType) return res.status(404).json({ message: "Команда не может быть создана!" });

    res.status(201).json({ result: newOrderType });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
    console.log(error);
  }
});

router.get("/getordertypes", async (req, res) => {
  try {
    let findOrderTypes = await order_types.find();

    if (!findOrderTypes) return res.status(400).json({ message: "Типов заказа еще нет!" });

    res.status(201).json({ result: findOrderTypes });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
