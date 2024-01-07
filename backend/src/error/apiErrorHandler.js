const logger = require('../logger');
const ApiError = require('./ApiError');

function apiErrorHandler(err, req, res, next) {
	if (res.headersSent) {
		return next(err);
	}

	if (err instanceof ApiError) {
		return res.status(err.code).json(err.message);
	}

	logger.error(err);

	res.status(500).json('Internal Server Error');
}

module.exports = apiErrorHandler;
