
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex.schema.createTable("dishes", table => {
	table.increments("id");
	table.string("name", 100);
	table.text("description");
	table.decimal("price");
	table.string("image_dishe", 250).nullable();
	table.string("type", 100);

});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable("dishes");
