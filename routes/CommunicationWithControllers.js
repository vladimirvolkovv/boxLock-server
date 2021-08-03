const { communicationWithController } = require("../models/communicationWithControllers");
const { unit } = require("../models/unit");
const express = require("express");
const router = express.Router();

router.get("/getcommunicationwithcontrollers/:id", async (req, res) => {
  try {
    // console.log(req.params.unit);
    let findClientUnits = await unit.find({ slClientId: req.params.id });

    let allControllersCommunication = await communicationWithController
      .find({ unitId: { $in: findClientUnits } })
      .populate({ path: "unitId", select: "name" })
      .populate({ path: "boxId", select: "name" })
      .populate({ path: "controllerId", select: "name" })
      .populate({ path: "currentStatus", select: "name" });
    if (!allControllersCommunication) return res.status(404).send("Данных пока нет!");
    //console.log(allControllersCommunication);

    res.status(200).json({ result: allControllersCommunication });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.get("/getcontrollerstatusformobile/:id", async (req, res) => {
  try {
    // console.log(req.params.unit);

    let allControllersCommunication = await communicationWithController
      .findOne({ boxId: req.params.id })
      .populate({ path: "currentStatus", select: "name" });

    if (!allControllersCommunication) return res.status(404).send("Данных пока нет!");
    //console.log(allControllersCommunication);

    res.status(200).json({ result: allControllersCommunication });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

module.exports = router;
