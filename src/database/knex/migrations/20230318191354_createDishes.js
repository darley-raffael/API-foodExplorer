
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex.schema.createTable("dishes", table => {
	table.increments("id");
	table.string("name", 100);
	table.text("description");
	table.string("image_dishe", 250).nullable();
	table.string("category", 100);
	table.decimal("price");

	table.timestamp("create_at").defaultTo(knex.fn.now());
	table.timestamp("update_at").defaultTo(knex.fn.now());

});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable("dishes");
