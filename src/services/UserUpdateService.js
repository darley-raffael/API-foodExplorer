const { compare, hash } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UserUpdateService {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async execute({ name, email, old_password, password }, { id }) {
		const user = await this.userRepository.findByUserId({ id });

		if (!user) {
			throw new AppError("Usuário não encontrado.");
		}

		const userWithUpdateEmail = await this.userRepository.findByEmail({ email });

		if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
			throw new AppError("Este email já está em uso.");
		}

		user.name = name ?? user.name;
		user.email = email ?? user.email;

		if (password && !old_password) {
			throw new AppError("Informe a senha antiga para atualizar");
		}

		if (password && old_password) {
			const checkOldPassword = await compare(old_password, user.password);

			if (!checkOldPassword) {
				throw new AppError("A senha antiga não confere");
			}

			user.password = await hash(password, 8);
		}

		const userUpdated = await this.userRepository.update(user, { id });

		return userUpdated;
	}

}

module.exports = UserUpdateService;