const ApiError = require('../error/ApiError');

function notFoundHandler(req, res, next) {
	next(ApiError.notFound('Route not found.'));
}

module.exports = notFoundHandler;
