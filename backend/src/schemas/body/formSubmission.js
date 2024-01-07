const ajv = require('../ajvInstance');
const student = require('../template/student.js');
const form = require('../template/form');

module.exports = ajv.compile({
	type: 'object',
	properties: {
		...student,
		...form,
	},
	required: [...Object.keys(student), ...Object.keys(form)],
	additionalProperties: false,
});
