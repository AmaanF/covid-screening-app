const ApiError = require('../../error/ApiError');
const AuthenticationService = require('../../services/authentication');

async function authenticateUser(req, res, next) {
	const authHeader = req.headers['authorization'];
	
	if (typeof authHeader !== 'string') return next();
	if (!authHeader.startsWith('Bearer '))
		return next(
			ApiError.badRequest(
				'Authorization header must start with "Bearer ".'
			)
		);

	const accessToken = authHeader.slice(7);

	if (!accessToken) return next();

	const user = await AuthenticationService.deserializeAccessToken(
		accessToken
	);

	if (!user) {
		// Invalid access token
		return next(ApiError.unauthorized('Invalid access token.'));
	}

	req.user = user;

	next();
}

module.exports = authenticateUser;
