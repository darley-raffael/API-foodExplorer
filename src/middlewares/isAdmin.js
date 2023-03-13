function isAdmin(req, res, next) {

	if (!req.body.isAdmin) {
		return res.status(401).json("Não autorizado");
	}

	next();
}

module.exports = isAdmin;