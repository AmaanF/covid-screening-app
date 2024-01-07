const ajv = require('../ajvInstance');
const teacher = require('../template/teacher');

module.exports = ajv.compile({
	type: 'object',
	properties: teacher,
	additionalProperties: false,
});
