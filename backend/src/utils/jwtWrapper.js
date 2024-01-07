const jwt = require('jsonwebtoken');

function signJwt(payload, secretOrPrivateKey, options = {}) {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, secretOrPrivateKey, options, (err, token) =>
			err ? reject(err) : resolve(token)
		);
	});
}

function verifyJwt(token, secretOrPublicKey, options = {}) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secretOrPublicKey, options, (err, payload) =>
			err ? reject(err) : resolve(payload)
		);
	});
}

module.exports = {
	signJwt,
	verifyJwt,
};
