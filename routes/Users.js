const { user } = require("../models/user");
const { sl_client } = require("../models/sl_client");
const { client } = require("../models/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

router.post("/adduser", async (req, res) => {
  try {
    let newUser = new user({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      isAdmin: req.body.isAdmin,
      isRoot: req.body.isRoot,
      slClientId: req.body.id,
    });
    newUser = await newUser.save();

    if (!newUser) return res.status(404).send("Пользователь не может быть создан!");

    res.status(201).json({ result: newUser });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
    console.log(error);
  }
});

router.get("/getusers/:id", async (req, res) => {
  try {
    let findClientUsers = await user.find({ slClientId: req.params.id });
    if (!findClientUsers) return res.status(404).send("Объектов не обнаружено!");

    res.status(201).json({ result: findClientUsers });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
    console.log(error);
  }
});

router.post("/clientlogin", async (req, res) => {
  secret = process.env.SECRET;
  try {
    let User = await user.findOne({ email: req.body.email }).populate("slClientId");
    if (!User) return res.status(400).json({ message: "Пользователя с таким email не существует!" });
    if (User && bcrypt.compareSync(req.body.password, User.passwordHash)) {
      const token = jwt.sign(
        {
          userId: User.id,
        },
        secret,
        { expiresIn: "1d" }
      );

      res
        .status(200)
        .send({ user: User.email, token: token, slClient: User.slClientId.name, slClientId: User.slClientId._id });
    } else {
      res.status(400).json({ message: "Неверный пароль!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
