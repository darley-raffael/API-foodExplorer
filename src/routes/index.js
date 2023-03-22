const { Router } = require("express");
const dishesRoutes = require("./dishes.routes");
const usersRouter = require("./users.routes");


const routes = Router();

routes.use("/users", usersRouter);
routes.use("/dishes", dishesRoutes);

module.exports = routes;