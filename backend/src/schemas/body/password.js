const ajv = require('../ajvInstance');

module.exports = ajv.compile({
	type: 'object',
	properties: {
		password: { type: 'string' },
	},
	required: ['password'],
	additionalProperties: false,
});
