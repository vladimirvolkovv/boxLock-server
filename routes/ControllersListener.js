const moment = require("moment");
const express = require("express");
const router = express.Router();
const { communicationWithController } = require("../models/communicationWithControllers");
const { controllerLocation } = require("../models/controllerLocation");
const { controller } = require("../models/controller");
const { command_queue } = require("../models/command_queue");
const { controller_event } = require("../models/controller_event");
const { event } = require("../models/event");

tDate = moment().format("YYYY-MM-DD HH:mm:ss");

router.post("/controllerlistener", async (req, res) => {
  //console.log("Содержимое:", req.body);

  let messagesArr = await req.body.messages;

  for (let element of messagesArr) {
    if ("operation" in element) {
      if (element.operation === "power_on") {
        let id = element.id;
        let powerOn = {
          date: tDate,
          interval: 5,
          messages: [
            {
              id: id,
              operation: "set_active",
              active: 1,
              online: 0,
            },
          ],
        };
        // console.log("Это powerON !!!!!!");
        res.json(powerOn);
      } else if (element.operation === "ping") {
        let controllerForSearch = await controller.findOne({ name: req.body.sn });
        let controllerLocationForSearch = await controllerLocation
          .findOne({ controllerId: controllerForSearch._id })
          .populate({ path: "unitId", select: "name" })
          .populate({ path: "boxId", select: "name" })
          .populate({ path: "controllerId", select: "name" });

        let communicationWithControllerForSearch = await communicationWithController.findOne({
          controllerId: controllerForSearch._id,
        });

        let commandQueueForSearch = await command_queue
          .findOne({ controllerId: controllerForSearch._id })
          .populate({ path: "commandId", select: "name" });

        if (commandQueueForSearch) {
          if (commandQueueForSearch.commandId.name === "open_door") {
            let onPingOpenDoor = {
              date: tDate,
              interval: 5,
              messages: [
                {
                  id: element.id,
                  operation: "open_door",
                  direction: 0,
                },
              ],
            };

            res.json(onPingOpenDoor);
          } else if (commandQueueForSearch.commandId.name === "set_free_mode") {
            let onPingSetFreeMode = {
              date: tDate,
              interval: 5,
              messages: [
                {
                  id: element.id,
                  operation: "set_mode",
                  mode: 2,
                },
              ],
            };
            res.json(onPingSetFreeMode);
          } else if (commandQueueForSearch.commandId.name === "set_normal_mode") {
            let onPingSetNormalMode = {
              date: tDate,
              interval: 5,
              messages: [
                {
                  id: element.id,
                  operation: "set_mode",
                  mode: 0,
                },
              ],
            };
            res.json(onPingSetNormalMode);
          } else if (commandQueueForSearch.commandId.name === "add_cards") {
            let onPingAddCards = {
              date: tDate,
              interval: 5,
              messages: [
                {
                  id: element.id,
                  operation: "add_cards",
                  cards: [
                    {
                      card: commandQueueForSearch.card,
                      flags: 32,
                      tz: 255,
                    },
                  ],
                },
              ],
            };
            res.json(onPingAddCards);
          } else if (commandQueueForSearch.commandId.name === "del_cards") {
            let onPingDelCards = {
              date: tDate,
              interval: 5,
              messages: [
                {
                  id: element.id,
                  operation: "del_cards",
                  cards: [
                    {
                      card: commandQueueForSearch.card,
                    },
                  ],
                },
              ],
            };
            res.json(onPingDelCards);
          }
          await command_queue.deleteOne({ controllerId: controllerForSearch._id });
        } else {
          if (communicationWithControllerForSearch === null) {
            let newCommunicationWithController = new communicationWithController({
              createdAt: Date.now(),
              type: req.body.type,
              controllerId: controllerForSearch._id,
              boxId: controllerLocationForSearch.boxId._id,
              unitId: controllerLocationForSearch.unitId._id,
            });
            newCommunicationWithController = await newCommunicationWithController.save();
            let onPing = {
              date: tDate,
              interval: 5,
              messages: [],
            };
            res.json(onPing);
            // console.log("Произошла запись!");
          } else {
            await communicationWithController.updateOne(
              { controllerId: controllerForSearch._id },
              {
                createdAt: Date.now(),
              }
            );
            let onPing = {
              date: tDate,
              interval: 5,
              messages: [],
            };
            res.json(onPing);
            // console.log("Произошел update!");
          }
        }
      } else if (element.operation === "events") {
        let eventsArr = element.events;

        for (let elementEv of eventsArr) {
          // console.log(elementEv);
          let controllerForSearch = await controller.findOne({ name: req.body.sn });
          let controllerLocationForSearch = await controllerLocation
            .findOne({ controllerId: controllerForSearch._id })
            .populate({ path: "boxId", select: "name" });
          let eventForSearch = await event.findOne({ code: elementEv.event });

          if (elementEv.event === 32 || elementEv.event === 33 || elementEv.event === 34 || elementEv.event === 35) {
            await communicationWithController.updateOne(
              { controllerId: controllerForSearch._id },
              {
                currentStatus: eventForSearch._id,
              }
            );
          }

          // console.log(elementEv);

          let newControllerEvent = new controller_event({
            eventDate: Date.now(),
            //eventDate: moment(time).format("YYYY-MM-DD HH:mm:ss"),
            boxId: controllerLocationForSearch.boxId._id,
            eventId: eventForSearch._id,
            card: elementEv.card,
            // eventCode: elementEv.event,
          });
          newControllerEvent = await newControllerEvent.save();
        }

        let id = element.id;
        let onEvents = {
          date: tDate,
          interval: 5,
          messages: [
            {
              id: id,
              operation: "events",
              events_success: eventsArr.length,
            },
          ],
        };

        res.json(onEvents);
      }
    }
  }
});

module.exports = router;
