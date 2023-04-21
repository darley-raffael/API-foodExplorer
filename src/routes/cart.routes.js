const { Router } = require("express");
const CartController = require("../controllers/CartController");
const isAdmin = require("../middlewares/isAdmin");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");


const cartRouter = Router();
const cartController = new CartController();

cartRouter.use(ensureAuthenticated);

cartRouter.post("/", cartController.create);
cartRouter.get("/:id", cartController.show);
cartRouter.get("/", isAdmin, cartController.index);
cartRouter.delete("/:id", cartController.update);
cartRouter.put("/", cartController.update);

module.exports = cartRouter;