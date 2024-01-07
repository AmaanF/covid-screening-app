const ajv = require('../ajvInstance');

module.exports = ajv.compile({
	type: 'object',
	properties: {
		refreshToken: { type: 'string' },
	},
	required: ['refreshToken'],
	additionalProperties: false,
});
