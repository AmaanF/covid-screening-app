const { question_columns, symptom_columns } = require('../../config');

const formData = {};

for (const field of [...question_columns, ...symptom_columns]) {
	formData[field] = { type: 'boolean' };
}

module.exports = formData;
