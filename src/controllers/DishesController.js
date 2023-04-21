const { default: knex } = require("knex");
const DishesRepository = require("../repositories/DishesRepository");
const DishesCreateService = require("../services/DishesCreateService");
const DiskStorage = require("../provider/DiskStorage");


class DishesController {
	async create(req, res) {
		const diskStorage = new DiskStorage();
		const dishesRepository = new DishesRepository;
		const dishesCreateService = new DishesCreateService(dishesRepository);
		const { name, price, category, description, ingredients } = req.body;

		let filename;

		if (req.file) {
			const { filename: imageFileName } = req.file;
			filename = await diskStorage.saveFile(imageFileName);
		}



		const dishCreated = await dishesCreateService.execute({ name, price, category, description, ingredients, filename });

		return res.json(dishCreated);
	}

	async update(req, res) {
		const diskStorage = new DiskStorage();
		const { name, category, description, ingredients, price } = req.body;
		const { id } = req.params;
		const { filename: imageFileName } = req.file;


		const dishe = await knex("dishes").where({ id }).first();

		if (dishe.image_dishe) {
			await diskStorage.deleteFile(dishe.image_dishe);
		}

		const filemame = await diskStorage.saveFile(imageFileName);


		dishe.name = name ?? dishe.name;
		dishe.category = category ?? dishe.category;
		dishe.description = description ?? dishe.description;
		dishe.price = price ?? dishe.price;
		dishe.image_dishe = filemame;

		const hasOnlyIngredients = typeof ingredients === "string";


		let ingredients_list;
		if (hasOnlyIngredients) {
			const ingredients_array = ingredients.split(",");
			ingredients_list = ingredients_array.map(ingredient => {
				return {
					ingredient: ingredient,
					dishe_id: dishe.id
				};
			});
		} else if (ingredients.length > 1) {

			ingredients_list = ingredients.map(ingredient => {
				return {
					ingredient: ingredient,
					dishe_id: dishe.id
				};
			});

			await knex("ingredients").where({ dishe_id: id }).delete();
			await knex("ingredients").where({ dishe_id: id }).insert(ingredients_list);
		}

		return res.status(200).json();

	}

	async show(req, res) {
		const { id } = req.params;
		const dishesRepository = new DishesRepository;
		const showDish = await dishesRepository.findById({ id });

		return res.json(showDish);
	}


	async index(req, res) {
		const { name, ingredients } = req.query;
		const dishesRepository = new DishesRepository;
		const indexDishes = await dishesRepository.index({ name, ingredients });
		return res.json(indexDishes);
	}

	async delete(req, res) {
		const { id } = req.params;

		const dishesRepository = new DishesRepository();
		await dishesRepository.delete({ id });

		return res.json();
	}
}

module.exports = DishesController;