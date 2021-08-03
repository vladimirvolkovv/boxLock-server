const { client } = require("../models/client");
const { client_type } = require("../models/client_type");
const { unit } = require("../models/unit");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

router.post("/addclient", async (req, res) => {
  try {
    let findClientType = await client_type.findOne({ name: req.body.clientType });
    if (!findClientType) return res.status(400).json({ message: "Такого типа клиента не существует!" });

    let findClient = await client.findOne({ name: req.body.name });

    if (findClient) return res.status(400).json({ message: "Клиент с таким названием уже существует!" });

    let newClient = new client({
      name: req.body.name,
      email: req.body.email,
      telephone: req.body.telephone,
      clientTypeId: findClientType._id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      patronymic: req.body.patronymic,
      documentType: req.body.documentType,
      documentSerial: req.body.documentSerial,
      documentNumber: req.body.documentNumber,
      documentDate: req.body.documentDate,
      documentIssuedBy: req.body.documentIssuedBy,
      clientAdress: req.body.clientAdress,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      slClientId: req.body.slClientId,
      inn: req.body.inn,
      kpp: req.body.kpp,
      ogrn: req.body.ogrn,
    });
    newClient = await newClient.save();

    if (!newClient) return res.status(404).json({ message: "Клиент не может быть создан!" });

    res.status(201).json({ result: newClient });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
    console.log(error);
  }
});

router.put("/updateclient/:id", async (req, res) => {
  try {
    let findClientType = await client_type.findOne({ name: req.body.clientType });
    if (!findClientType) return res.status(400).json({ message: "Такого типа клиента не существует!" });
    let newClientForUpdate = await client.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        telephone: req.body.telephone,
        clientTypeId: findClientType._id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        patronymic: req.body.patronymic,
        documentType: req.body.documentType,
        documentSerial: req.body.documentSerial,
        documentNumber: req.body.documentNumber,
        documentDate: req.body.documentDate,
        documentIssuedBy: req.body.documentIssuedBy,
        clientAdress: req.body.clientAdress,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        slClientId: req.body.slClientId,
        inn: req.body.inn,
        kpp: req.body.kpp,
        ogrn: req.body.ogrn,
      },
      { new: true }
    );

    if (!newClientForUpdate) return res.status(404).json({ message: "Такого клиента не существует!" });

    res.status(201).json({ message: "Клиент успешно изменен!" });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
    console.log(error);
  }
});

router.get("/getallclients/:id", async (req, res) => {
  try {
    // let findClientUnits = await unit.find({ slClientId: req.params.id });
    //let findClientBox = await box.find({ unitId: { $in: findClientUnits } });
    //console.log(findClientBox);
    let allClients = await client
      .find({ slClientId: req.params.id })
      .populate({ path: "clientTypeId", select: "name" });

    if (!allClients) return res.status(404).send("Данных пока нет!");

    res.status(200).json({ result: allClients });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.get("/getclient/:id", async (req, res) => {
  try {
    let findClient = await client
      .findById(req.params.id)

      .populate({ path: "clientTypeId", select: "name" });

    if (!findClient) return res.status(404).send("Данных пока нет!");

    res.status(200).json({ result: findClient });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.post("/clientmobilelogin", async (req, res) => {
  secret = process.env.SECRET;

  try {
    let Client = await client.findOne({ telephone: req.body.telephone });
    if (!Client) return res.status(400).json({ message: "Пользователя с такими данными не существует!" });
    if (Client && bcrypt.compareSync(req.body.password, Client.passwordHash)) {
      const token = jwt.sign(
        {
          clientId: Client._id,
        },
        secret,
        { expiresIn: "1d" }
      );

      res.status(200).send({ telephone: Client.telephone, token: token, clientId: Client._id });
    } else {
      res.status(400).json({ message: "Неверный пароль!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
    console.log(error);
  }
});

module.exports = router;
