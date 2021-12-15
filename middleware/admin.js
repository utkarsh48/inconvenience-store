const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	if (req.user.roleName !== "admin") return res.sendStatus(403);

	next();
}