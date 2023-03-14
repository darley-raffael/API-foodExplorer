const UserRepository = require("../repositories/UserRepository");
const UserCreateService = require("../services/UserCreateService");
const UserUpdateService = require("../services/UserUpdateService");
// const AppError = require("../utils/AppError");


class UsersController {
	async create(req, res) {
		const userRepository = new UserRepository();
		const userCreateService = new UserCreateService(userRepository);
		const { name, email, password } = req.body;


		await userCreateService.execute({ name, email, password });

		return res.status(201).json({ status: "Criado com sucesso" });
	}

	//  Criar o controller de (Update)
	async update(req, res) {
		const userRepository = new UserRepository();
		const userUpdateService = new UserUpdateService(userRepository);
		const { name, email, old_password, password } = req.body;
		const user_id = req.user.id;
		console.log(user_id);

		await userUpdateService.execute({ name, email, old_password, password }, user_id);

		return res.status(201).json({ status: "Perfil atualizado com sucesso" });
	}

}


module.exports = UsersController;