const { controller } = require("../models/controller");
const { unit } = require("../models/unit");
const express = require("express");
const router = express.Router();

router.post("/addcontroller", async (req, res) => {
  try {
    let findController = await controller.findOne({ name: req.body.name });
    let findUnitId = await unit.findOne({ name: req.body.unitId.name });
    if (findController) return res.status(400).json({ message: "Контроллер с таким номером уже существует!" });

    let newController = new controller({
      name: req.body.name,
      ipAddress: req.body.ipAddress,
      unitId: findUnitId._id,
    });
    newController = await newController.save();

    if (!newController) return res.status(404).json({ message: "Контроллер не может быть добавлен!" });

    res.status(201).json({ result: newController });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.get("/allcontrollers/:activePage/:pageSize/:id", async (req, res) => {
  try {
    let findClientUnits = await unit.find({ slClientId: req.params.id });
    //let totalCount = await controller.find().count();
    let totalCount = await controller.estimatedDocumentCount({ unitId: { $in: findClientUnits } });
    let page = Number(req.params.activePage),
      pageSize = Number(req.params.pageSize);

    let allControllers = await controller
      .find({ unitId: { $in: findClientUnits } })
      .limit(pageSize)
      .skip(pageSize * page)
      .sort({ name: 1 })
      .populate("unitId");
    // console.log(req.params.activePage);
    // console.log(req.params.pageSize);
    if (!allControllers) return res.status(404).send("Контроллеров пока нет");

    res.status(200).json({ result: { allControllers, totalCount } });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.get("/allcontrollers/:unit", async (req, res) => {
  try {
    // console.log(req.params.unit);
    let unitForSearch = await unit.findOne({ name: req.params.unit });
    let allControllers = await controller.find({ unitId: unitForSearch._id }).select("name");
    if (!allControllers) return res.status(404).send("Боксов пока нет");
    // console.log(allBoxes);

    res.status(200).json({ result: allControllers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.delete("/deletecontroller/:id", async (req, res) => {
  try {
    let controllerForDelete = await controller.findByIdAndRemove(req.params.id);

    if (!controllerForDelete) return res.status(404).send("Контроллера с таким id не существует!");

    res.status(200).json({ message: "Контроллер успешно удален!" });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.put("/putcontroller/:id", async (req, res) => {
  try {
    let findUnitId = await unit.findOne({ name: req.body.unitId.name });
    let findControllerWithName = await controller.findOne({ name: req.body.name });

    if (findControllerWithName && findControllerWithName._id != req.params.id)
      return res.status(404).json({ message: "Контроллер с таким наименованием уже существует!" });
    let controllerForUpdate = await controller.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        ipAddress: req.body.ipAddress,
        unitId: findUnitId._id,
      },
      { new: true }
    );

    if (!controllerForUpdate) return res.status(404).send("Контроллера с таким id не существует!");

    res.status(200).json({ message: "Контроллер успешно изменен!" });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
