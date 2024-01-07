const ApiError = require('../../error/ApiError');

function authorize(mustBeAdmin) {
	return (req, res, next) => {
		
		if (!req.user)
			return next(
				ApiError.unauthorized('This route requires authentication.')
			);
		if (mustBeAdmin > req.user.admin)
			return next(
				ApiError.forbidden('You must be an admin to use this route.')
			);

		next();
	};
}

module.exports = authorize;
