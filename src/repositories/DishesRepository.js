/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */



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


}




module.exports = DishesRepository;