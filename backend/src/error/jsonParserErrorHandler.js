const ApiError = require('./ApiError');

function jsonParserErrorHandler(err, req, res, next) {
	next(ApiError.badRequest('Body must be valid JSON.'));
}

module.exports = jsonParserErrorHandler;
