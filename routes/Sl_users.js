const { sl_user } = require("../models/sl_user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/registration", async (req, res) => {
  try {
    let findEmail = await sl_user.findOne({ email: req.body.email });
    if (findEmail) return res.status(400).json({ message: "Такой пользователь существует!" });

    let user = new sl_user({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
    });
    user = await user.save();

    if (!user) return res.status(404).send("Пользователь не может быть создан!");

    res.status(201).json({ result: user });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.post("/login", async (req, res) => {
  secret = process.env.SECRET;
  try {
    const user = await sl_user.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "Пользователя с таким email не существует!" });
    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const token = jwt.sign(
        {
          userId: user.id,
        },
        secret,
        { expiresIn: "1d" }
      );

      res.status(200).send({ user: user.email, token: token });
    } else {
      res.status(400).json({ message: "Неверный пароль!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
