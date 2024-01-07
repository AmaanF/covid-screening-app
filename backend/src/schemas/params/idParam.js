const ajv = require('../ajvInstance');

module.exports = ajv.compile({
	type: 'object',
	properties: {
		id: { type: 'integer', minimum: 0, format: 'int32' },
	},
	required: ['id'],
	additionalProperties: false,
});
