
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex.schema.createTable("cart_items", table => {
	table.increments("id").notNullable();
	table.string("title", 250);
	table.integer("quantity");
	table.integer("dishe_id").references("id").inTable("dishes").onDelete("CASCADE");
	table.integer("cart_id").references("id").inTable("cart");
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable("cart_items");
