const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const token = req.header('x-auth-token');

	if(!token) res.sendStatus(401);
	try {
		const decoded = jwt.verify(token, process.env['JWT_AUTH_KEY']);

		req.user = decoded;
		next();
	}
	catch(ex) {
		res.sendStatus(400);
	}
}