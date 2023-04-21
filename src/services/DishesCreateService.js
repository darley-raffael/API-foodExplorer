

class DishesCreateService {
	constructor(dishesRepository) {
		this.dishesRepository = dishesRepository;
	}


	async execute({ name, price, category, description, ingredients, filename }) {

		const dishe_id = await this.dishesRepository.create({
			name,
			price,
			category,
			description,
			filename
		});

		const hasOnlyIngredients = typeof ingredients === "string";

		let ingredients_list;

		if (hasOnlyIngredients) {
			const ingredients_array = ingredients.split(",");
			ingredients_list = ingredients_array.map(ingredient => {
				return {
					ingredient: ingredient,
					dishe_id
				};
			});
		} else if (ingredients.length > 1) {

			ingredients_list = ingredients.map(ingredient => {
				return {
					ingredient: ingredient,
					dishe_id
				};
			});
		}


		await this.dishesRepository.insertIngredients(ingredients_list);

		return {
			dishe_id,
			ingredients_list
		};

	}

}

module.exports = DishesCreateService;