/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex.schema.createTable("orders", table => {
	table.increments("id").notNullable();
	table.string("payment_method").notNullable();
	table.string("status");
	table.decimal("subtotal", 10, 2);
	table.timestamp("create_at").defaultTo(knex.fn.now());
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable("orders");
