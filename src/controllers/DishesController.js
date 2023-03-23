const DishesRepository = require("../repositories/DishesRepository");
const DishesCreateService = require("../services/DishesCreateService");


class DishesController {
	async create(req, res) {
		const dishesRepository = new DishesRepository;
		const dishesCreateService = new DishesCreateService(dishesRepository);
		const { name, price, type, description, ingredients } = req.body;

		const dishCreated = await dishesCreateService.execute({ name, price, type, description, ingredients });


		return res.json(dishCreated);
	}

	async show(req, res) {
		const { id } = req.params;
		const dishesRepository = new DishesRepository;
		const showDish = await dishesRepository.findById({ id });

		return res.json(showDish);
	}
}


module.exports = DishesController;