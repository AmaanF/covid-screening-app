const ApiError = require('../error/ApiError');
const AuthenticationService = require('../services/authentication');

class AuthenticationController {
	login(req, res, next) {
		AuthenticationService.login(req.body)
			.then((tokens) =>
				tokens
					? res.json(tokens)
					: next(ApiError.forbidden('Login Failed.'))
			)
			.catch((err) => next(err));
	}

	logout(req, res, next) {
		AuthenticationService.logout(req.body)
			.then((logoutSuccess) =>
				res.json(
					logoutSuccess
						? 'Successfully logged out.'
						: 'Logout unsuccessful.'
				)
			)
			.catch((err) => next(err));
	}

	hardLogout(req, res, next) {
		AuthenticationService.hardLogout(req.user)
			.then(() => res.json('Successfully logged out.'))
			.catch((err) => next(err));
	}

	accessToken(req, res, next) {
		AuthenticationService.createAccessToken(req.body)
			.then((accessToken) =>
				accessToken
					? res.json({ accessToken })
					: next(ApiError.unauthorized('Invalid refresh token.'))
			)
			.catch((err) => next(err));
	}

	changePassword(req, res, next) {
		AuthenticationService.changePassword(req.user, req.body)
			.then(() => res.json('Successfully changed password.'))
			.catch((err) => next(err));
	}
}

module.exports = new AuthenticationController();
