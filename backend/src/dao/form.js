const { question_columns, symptom_columns } = require('../config');
const Form = require('../models/form');

class FormDAO {
	findById(id) {
		return Form.query()
			.findById(id)
			.select([
				'id',
				...question_columns,
				...symptom_columns,
				'created_at',
				'updated_at',
			]);
	}

	create(form) {
		// Input must have: questions, symptoms, student_id
		return Form.query().insert(form);
	}

	delete(id) {
		return Form.query().deleteById(id);
	}

	deleteFromStudent(studentId) {
		return Form.query().delete().where('student_id', studentId);
	}

	update(id, form) {
		// Input must have: id, questions, symptoms
		return Form.query().findById(id).patch(form);
	}
}

module.exports = new FormDAO();
