const { UniqueViolationError } = require('objection');
const ApiError = require('./ApiError');

function objectionErrorHandler(err, req, res, next) {
	if (err instanceof UniqueViolationError) {
		return next(ApiError.conflict(`That ${err.columns[0]} is taken.`));
	}

	next(err);
}

module.exports = objectionErrorHandler;
