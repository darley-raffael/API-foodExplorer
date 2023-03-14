const { Router } = require("express");
const UsersController = require("../controllers/UsersController");




const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post("/", usersController.create);
usersRouter.put("/", usersController.update);

module.exports = usersRouter;