const UserRepository = require("../repositories/UserRepository");


async function isAdmin(req, res, next) {
	const user_id = req.user.id;
	const userRepository = new UserRepository;

	const user = await userRepository.findByUserId({ id: user_id });


	if (!(user.profile === "admin")) {
		return res.status(401).json("Não autorizado");
	}

	next();
}

module.exports = isAdmin;