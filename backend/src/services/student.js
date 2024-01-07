const StudentDAO = require('../dao/student');
const FormDAO = require('../dao/form');

class StudentService {
	getAll() {
		return StudentDAO.getAll();
	}

	getOne(id) {
		return StudentDAO.getOne(id);
	}

	getOneWithForms(id) {
		return StudentDAO.getOneWithForms(id);
	}

	create(student) {
		return StudentDAO.create(student);
	}

	async delete(id) {
		await FormDAO.deleteFromStudent(id);
		await StudentDAO.delete(id);
	}

	update(id, student) {
		return StudentDAO.update(id, student);
	}
}

module.exports = new StudentService();
