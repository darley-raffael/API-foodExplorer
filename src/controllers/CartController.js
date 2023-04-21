const { default: knex } = require("knex");


class CartController {
	async create(req, res) {
		const { status, paymentMethod, orders } = req.body;
		const custommer_id = req.user.id;

		const cart_id = await knex("cart").insert({
			status,
			paymentMethod,
			custommer_id
		});

		const ordersInsert = orders.map(order => {
			return {
				title: order.title,
				quantity: order.quantity,
				cart_id,
				dishe_id: order.id
			};
		});

		await knex("cart_items").insert(ordersInsert);

		return res.status(201).json();
	}

	async update(req, res) {
		const { id, status } = req.body;

		await knex("cart").update({ status }).where({ id });

		return res.status(201).json();
	}

	async index(req, res) {
		const carts = await knex("cart");
		const orders = await knex("cart_items");

		const cartWithItens = carts.map(cart => {
			const cartOrder = orders.filter(order => order.cart_id === cart.id);

			return {
				...cart,
				orders: cartOrder
			};
		});

		return res.status(201).json(cartWithItens);
	}

	async show(req, res) {
		const { id } = req.params;

		const cart = await knex("cart").where({ user_id: id }).first();
		const orders = await knex("cart_items").where({ cart_id: id });

		return res.status(201).json({
			...cart,
			orders
		});
	}

	async delete(req, res) {
		const { id } = req.params;

		await knex("cart").where({ user_id: id }).delete();

		return res.status(201).json();
	}
}

module.exports = CartController;