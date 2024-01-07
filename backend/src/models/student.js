const { Model } = require('objection');

class Student extends Model {
	static get tableName() {
		return 'student';
	}

	static get relationMappings() {
		const Form = require('./form');

		return {
			forms: {
				relation: Model.HasManyRelation,
				modelClass: Form,
				join: {
					from: 'student.id',
					to: 'form.student_id',
				},
			},
		};
	}
}

module.exports = Student;
