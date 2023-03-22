const UserRepository = require("../repositories/UserRepository");
const UserCreateService = require("../services/UserCreateService");
const UserUpdateService = require("../services/UserUpdateService");
// const AppError = require("../utils/AppError");


class UsersController {
	async create(req, res) {
		const userRepository = new UserRepository();
		const userCreateService = new UserCreateService(userRepository);
		const { name, email, password } = req.body;
		const { profile } = Object.assign({}, req.body, { profile: "customer" });

		await userCreateService.execute({ name, email, password, profile });

		return res.status(201).json({ status: "Criado com sucesso" });
	}

	//  Criar o controller de (Update)
	async update(req, res) {
		const userRepository = new UserRepository();
		const userUpdateService = new UserUpdateService(userRepository);
		const { name, email, old_password, password } = req.body;
		const { id } = req.params;


		await userUpdateService.execute({ name, email, old_password, password }, { id });

		return res.status(201).json({ status: "Perfil atualizado com sucesso" });
	}

}


module.exports = UsersController;