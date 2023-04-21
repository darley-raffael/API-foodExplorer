
const knex = require("../database/knex");


class DishesRepository {

	async create({ name, price, category, description, filename }) {
		const [newDish] = await knex("dishes").insert({
			name,
			price,
			category,
			description,
			image_dishe: filename ?? null
		});
		return newDish;
	}

	async insertIngredients(ingredients) {
		await knex("ingredients").insert(ingredients);
	}

	//Inserir função de atualização dos pratos abaixo

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

	async index({ name, ingredients }) {
		let dishesQuery;
		if (ingredients) {
			const filterIngredients = ingredients.split(",").map(ingredient => ingredient.trim());
			dishesQuery = knex("dishes")
				.select(
					"dishes.id",
					"dishes.name",
					"dishes.description",
					"dishes.price",
					"dishes.image_dishe",
					"dishes.category"
				)
				.innerJoin("ingredients", "ingredients.dishe_id", "dishes.id")
				.whereIn("ingredients.ingredient", filterIngredients)
				.groupBy("dishes.id")
				.orderBy("dishes.name");
		} else {
			dishesQuery = knex("dishes")
				.select(
					"dishes.id",
					"dishes.name",
					"dishes.description",
					"dishes.price",
					"dishes.image_dishe",
					"dishes.category"
				)
				.innerJoin("ingredients", "ingredients.dishe_id", "dishes.id")
				.groupBy("dishes.id")
				.orderBy("dishes.name");
		}

		if (name) {
			dishesQuery = dishesQuery.whereLike("dishes.name", `%${name}%`);
		}

		const dishes = await dishesQuery;

		const dishIds = dishes.map(dish => dish.id);

		const listIngredients = await knex("ingredients")
			.select("dishe_id", "ingredient")
			.whereIn("dishe_id", dishIds);

		const dishesWithIngredients = dishes.map(dish => {
			const dishIngredients = listIngredients
				.filter(ingredient => ingredient.dishe_id === dish.id)
				.map(ingredient => ingredient.ingredient);

			return { ...dish, ingredients: dishIngredients };
		});

		return dishesWithIngredients;
	}

	async delete({ id }) {
		await knex("dishes").where({ id }).delete();

	}


}




module.exports = DishesRepository;