const ajv = require('../ajvInstance');

module.exports = ajv.compile({
	type: 'object',
	properties: {
		email: { type: 'string', format: 'email', maxLength: 255 },
		password: { type: 'string' },
	},
	required: ['email', 'password'],
	additionalProperties: false,
});
