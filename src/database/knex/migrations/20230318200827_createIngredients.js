
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex.schema.createTable("ingredients", table => {
	table.increments("id");
	table.string("ingredient", 100);
	table.integer("diche_id").references("id").inTable("dishes");
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable("ingredients");
