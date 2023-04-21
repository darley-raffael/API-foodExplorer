
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => knex.schema.createTable("customers", table => {
	table.increments("id");
	table.text("name");
	table.text("email").unique();
	table.text("password");
	table.enum("profile", ["customer", "admin"]).defaultTo("customer");

	table.timestamp("create_at").defaultTo(knex.fn.now());
	table.timestamp("update_at").defaultTo(knex.fn.now());
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable("customers");