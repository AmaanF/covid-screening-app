const buildDevLogger = require('./devLogger');
const buildProdLogger = require('./prodLogger');

module.exports =
	process.env.NODE_ENV === 'development'
		? buildDevLogger()
		: buildProdLogger();
