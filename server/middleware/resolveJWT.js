var jwt = require('jsonwebtoken');

const resolveJWT = (req, resp, next) => {
	try {
		var decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
		req.body.id = decoded.id;
		next();
	} catch (error) {
		resp.status(400).json({ error: "Unable to authanticate the user" });
	}
}

module.exports = resolveJWT;