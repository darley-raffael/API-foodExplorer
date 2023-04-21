

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex.schema.createTable("cart", table => {
	table.increments("id");
	table.text("status");
	table.text("paymentMethod");

	table.timestamp("create_at").defaultTo(knex.fn.now());

	table.integer("custommer_id").references("id").inTable("custummer");

});



/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable("cart");
