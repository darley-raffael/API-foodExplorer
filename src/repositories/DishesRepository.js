
const knex = require("../database/knex");


class DishesRepository {

	async create({ name, price, type, description }) {
		const [newDish] = await knex("dishes").insert({
			name,
			price,
			type,
			description
		});
		return newDish;
	}

	async insertIngredients(ingredients) {
		await knex("ingredients").insert(ingredients);
	}

	async findById({ id }) {
		const dishe = await knex("dishes")
			.where({ id })
			.first();
		const ingredients = await knex("ingredients")
			.select("ingredient")
			.pluck("ingredient") // obtêm somente o valor da lista de ingredients
			.where({ dishe_id: id })
			.orderBy("ingredient");

		return { dishe, ingredients };
	}


}




module.exports = DishesRepository;