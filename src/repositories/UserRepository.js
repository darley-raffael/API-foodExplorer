const sqliteConnection = require("../database/sqlite");


class UserRepository {

	async findByEmail({ email }) {
		const database = await sqliteConnection();
		const user = await database
			.get("SELECT email FROM customers WHERE email = (?)", [email]);

		return user;
	}

	async create({ name, email, password }) {
		const database = await sqliteConnection();
		const userId = database.run(`--sql
			INSERT INTO customers (
				name, 
				email, 
				password
			)
			VALUES (?,?,?)
		`, [name, email, password]);

		return { id: userId };
	}
}

module.exports = UserRepository;

