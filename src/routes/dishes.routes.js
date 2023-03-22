const { Router } = require("express");
const DishesController = require("../controllers/DishesController");
const isAdmin = require("../middlewares/isAdmin");


const dishesRoutes = Router();
const dishesController = new DishesController;

dishesRoutes.post("/:id", isAdmin, dishesController.create);

module.exports = dishesRoutes;