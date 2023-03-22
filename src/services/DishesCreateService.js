

class DishesCreateService {
	constructor(dishesRepository) {
		this.dishesRepository = dishesRepository;
	}


	async execute({ name, price, type, description, ingredients }) {

		const dishe_id = await this.dishesRepository.create({
			name,
			price,
			type,
			description
		});

		const ingredients_list = ingredients.map(ingredient => {
			return {
				ingredient: ingredient,
				dishe_id
			};
		});

		await this.dishesRepository.insertIngredients(ingredients_list);

		return {
			dishe_id,
			ingredients_list
		};

	}

}

module.exports = DishesCreateService;