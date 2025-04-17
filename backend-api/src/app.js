// Import section
const express = require("express");
const cors = require("cors");

const JSend = require("./jsend");
const laptopsRouter = require("./routes/laptops.router");
const customersRouter = require("./routes/customers.router");
const cartsRouter = require("./routes/carts.router");
const ordersRouter = require("./routes/orders.router");
const {
  resourceNotFound,
  handleError,
} = require("./controllers/errors.controller");
const { specs, swaggerUi } = require("./docs/swagger");

// Middlewares
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.json(JSend.success());
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/public", express.static("public"));

laptopsRouter.setup(app);
customersRouter.setup(app);
cartsRouter.setup(app);
ordersRouter.setup(app);

app.use(resourceNotFound);

app.use(handleError);

module.exports = app;
