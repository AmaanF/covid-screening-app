const ajv = require('../ajvInstance');
const student = require('../template/student.js');

module.exports = ajv.compile({
	type: 'object',
	properties: {
		...student,
	},
	required: [...Object.keys(student)],
	additionalProperties: false,
});
