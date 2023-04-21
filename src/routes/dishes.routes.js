const { Router } = require("express");
const DishesController = require("../controllers/DishesController");
const isAdmin = require("../middlewares/isAdmin");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");


const dishesRouter = Router();
const dishesController = new DishesController;
const upload = multer(uploadConfig.MULTER);
dishesRouter.use(ensureAuthenticated);

dishesRouter.post("/:id", isAdmin, upload.single("image_dishe"), dishesController.create);
dishesRouter.get("/:id", dishesController.show);
dishesRouter.get("/", dishesController.index);
dishesRouter.put("/:id", isAdmin, upload.single("image_dishe"), dishesController.update);
dishesRouter.delete("/:id", isAdmin, dishesController.delete);

module.exports = dishesRouter;
