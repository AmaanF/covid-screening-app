const ApiError = require('../../error/ApiError');

function validateParams(schema) {
	return (req, res, next) => {
		const valid = schema(req.params);

		if (!valid) {
			const errors = schema.errors;
			return next(ApiError.badRequest(errors));
		}

		next();
	};
}

module.exports = validateParams;
