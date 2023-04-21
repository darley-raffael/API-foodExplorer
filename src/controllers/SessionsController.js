const { compare } = require("bcryptjs");
const UserRepository = require("../repositories/UserRepository");
const AppError = require("../utils/AppError");
const auth = require("../configs/auth");
const { sign } = require("jsonwebtoken");


class SessionController {
	async create(req, res) {
		const { email, password } = req.body;
		const userRepository = new UserRepository();
		const user = await userRepository.findByEmail({ email });

		if (!user) {
			throw new AppError("Email e/ou senha incorreta", 401);
		}

		const passwordMatched = await compare(password, user.password);

		if (!passwordMatched) {
			throw new AppError("Email e/ou senha incorreta", 401);
		}

		const { secret, expiresIn } = auth.jwt;
		const token = sign({}, secret, {
			subject: String(user.id),
			expiresIn
		});

		return res.json({ user, token });

	}
}

module.exports = SessionController;