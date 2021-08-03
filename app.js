const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

require("dotenv/config");

const api = process.env.API_URL;
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 5,
});

//middleware
app.use(morgan("tiny"));
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
//app.use(limiter);
app.use(authJwt());
app.use(errorHandler);

//маршруты для админки sl
const slUsersRoutes = require("./routes/Sl_users");
const slClientsRoutes = require("./routes/Slclients");
const unitRoutes = require("./routes/Units");
const userRoutes = require("./routes/Users");
const clientUnitFloors = require("./routes/UnitFloors");

app.use(`${api}/sladm`, slUsersRoutes);
app.use(`${api}/sladm`, slClientsRoutes);
app.use(`${api}/sladm`, unitRoutes);
app.use(`${api}/sladm`, userRoutes);
app.use(`${api}/sladm`, clientUnitFloors);

//маршруты для админки sl client
const controllerRoutes = require("./routes/Controllers");
const boxRoutes = require("./routes/Boxes");
const controllerLocationRoutes = require("./routes/ControllersLocation");
const communicationWithControllerRoutes = require("./routes/CommunicationWithControllers");
const controllersEventsRoutes = require("./routes/ControllerEvents");

app.use(`${api}/sladm`, controllerRoutes);
app.use(`${api}/sladm`, boxRoutes);
app.use(`${api}/sladm`, controllerLocationRoutes);
app.use(`${api}/sladm`, communicationWithControllerRoutes);
app.use(`${api}/sladm`, controllersEventsRoutes);

//маршруты для управления контроллерами
const controllerListenerRoutes = require("./routes/ControllersListener");
const commandRoutes = require("./routes/Command");
const commandQueueRoutes = require("./routes/CommandQueue");
const eventRoutes = require("./routes/Event");

app.use(`${api}/slcl`, controllerListenerRoutes);
app.use(`${api}/slcl`, commandRoutes);
app.use(`${api}/slcl`, commandQueueRoutes);
app.use(`${api}/slcl`, eventRoutes);

//маршруты для системы учета
const clientsRoutes = require("./routes/Clients");
const clientTypeRoutes = require("./routes/ClientTypes");
const clientTariffsRoutes = require("./routes/Tariffs");
const clientCardsRoutes = require("./routes/Card");
const clientContractStatus = require("./routes/ContractStatus");
const clientBoxCoordinates = require("./routes/BoxCoordinates");
const clientContract = require("./routes/Contract");
const orderTypesRoutes = require("./routes/OrderTypes");
const contractOrderRoutes = require("./routes/ContractOrder");
const paymentTypeRoutes = require("./routes/PaymentTypes");
const contractPaymentRoutes = require("./routes/ContractPayment");

app.use(`${api}/slman`, clientsRoutes);
app.use(`${api}/slman`, clientTypeRoutes);
app.use(`${api}/slman`, clientTariffsRoutes);
app.use(`${api}/slman`, clientCardsRoutes);
app.use(`${api}/slman`, clientContractStatus);
app.use(`${api}/slman`, clientBoxCoordinates);
app.use(`${api}/slman`, clientContract);
app.use(`${api}/slman`, orderTypesRoutes);
app.use(`${api}/slman`, contractOrderRoutes);
app.use(`${api}/slman`, paymentTypeRoutes);
app.use(`${api}/slman`, contractPaymentRoutes);

app.get("/", (req, res) => {
  res.send("<h2>Это сервер SMARTLOCK!!</h2>");
});

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Связь с БД установлена");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3003, () => {
  console.log("server is running http://localhost:3003");
});
