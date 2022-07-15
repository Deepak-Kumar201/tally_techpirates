var jwt = require('jsonwebtoken');
const jwtTokken = "hj4h5432j5h$$Fh5i348u98**HU(*YGY$G#JH#)";

const resolveJWT = (req, resp, next) => {
	try {
		var decoded = jwt.verify(req.cookies.token, jwtTokken);
		req.body.id = decoded.id;
		next();
	} catch (error) {
		resp.status(400).json({ error: "Unable to authanticate the user" });
	}
}

module.exports = resolveJWT;