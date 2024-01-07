const ajv = require('../ajvInstance');
const form = require('../template/form');

module.exports = ajv.compile({
	type: 'object',
	properties: form,
	additionalProperties: false,
});
