const UserRepository = require("../repositories/UserRepository");
const UserCreateService = require("../services/UserCreateService");
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



}


module.exports = UsersController;