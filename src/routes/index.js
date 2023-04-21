const { Router } = require("express");
const dishesRouter = require("./dishes.routes");
const usersRouter = require("./users.routes");
const cartRouter = require("./cart.routes");
const sessionRouter = require("./sessions.routes");


const routes = Router();

routes.use("/users", usersRouter);
routes.use("/dishes", dishesRouter);
routes.use("/cart", cartRouter);
routes.use("/sessions", sessionRouter);

module.exports = routes;