const ApiError = require('../../error/ApiError');

function validateDto(schema) {
	return (req, res, next) => {
		const valid = schema(req.body);

		if (!valid) {
			const errors = schema.errors;
			return next(ApiError.badRequest(errors));
		}

		next();
	};
}

module.exports = validateDto;
