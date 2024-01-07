const express = require('express');
const authorize = require('../middleware/auth/authorization');
const validateDto = require('../middleware/validation/validateDto');
const validateParams = require('../middleware/validation/validateParams');
const emptyBody = require('../schemas/body/emptyBody');
const emptyParams = require('../schemas/params/emptyParams');

function letAnyoneThrough(req, res, next) {
	next();
}

function createRouter(...routes) {
	const router = express.Router();

	for (const route of routes) {
		const authorization = route.authorization
			? authorize(route.authorization.admin)
			: letAnyoneThrough;

		router[route.method](
			route.route,
			authorization,
			validateParams(route.paramsValidator ?? emptyParams),
			validateDto(route.bodyValidator ?? emptyBody),
			route.handler
		);
	}

	return router;
}

module.exports = createRouter;
