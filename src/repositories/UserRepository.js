const sqliteConnection = require("../database/sqlite");


class UserRepository {



	async findByEmail({ email }) {
		const database = await sqliteConnection();
		const user = await database
			.get("SELECT * FROM customers WHERE email = (?)", [email]);

		return user;
	}

	async create({ name, email, password, profile }) {
		const database = await sqliteConnection();
		const userId = await database.run(`--sql
			INSERT INTO customers (
				name, 
				email, 
				password,
				profile
			)
			VALUES (?,?,?,?)
		`, [name, email, password, profile]);

		return { id: userId };
	}

	async findByUserId({ id }) {
		const database = await sqliteConnection();
		const user = await database
			.get("SELECT * FROM customers WHERE id = (?)", [id]);

		return user;
	}

	async update(user, { id }) {
		const database = await sqliteConnection();
		await database.run(`--sql
			UPDATE customers SET
			name = ?, 
			email = ?,
			password = ?,
			update_at = DATETIME('now')
			WHERE id = ?`, [user.name, user.email, user.password, id]
		);
	}
}

module.exports = UserRepository;

