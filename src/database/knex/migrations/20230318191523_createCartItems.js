
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex.schema.createTable("cart_items", table => {
	table.increments("id").notNullable();
	table.integer("quantity");
	table.integer("order_id").references("id").inTable("orders");
	table.integer("dishe_id").references("id").inTable("dishes");
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable("cart_items");
