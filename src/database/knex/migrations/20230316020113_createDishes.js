
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex.schema.createTable("dishes", table => {
	table.increments("id");
	table.string("name", 100);
	table.text("description");
	table.decimal("price");
	table.binary("image_dishe").nullable();
	table.string("type", 100);

});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable("dishes");
