const FormDAO = require('../dao/form');
const StudentDAO = require('../dao/student');
const ApiError = require('../error/ApiError');
const splitObject = require('../utils/splitObject');

class FormService {
	get(id) {
		return FormDAO.findById(id);
	}

	async create(form) {
		const [user, formData] = splitObject(form, [
			'first_name',
			'last_name',
			'email',
			'grade',
		]);

		const studentId = await StudentDAO.find(user);
		if (!studentId) throw ApiError.badRequest("Couldn't find student.");

		formData['student_id'] = studentId;

		await FormDAO.create(formData);
	}

	delete(id) {
		return FormDAO.delete(id);
	}

	update(id, form) {
		return FormDAO.update(id, form);
	}
}

module.exports = new FormService();
