const ajv = require('../ajvInstance');

module.exports = ajv.compile({
	type: 'object',
	additionalProperties: false,
});
