const Student = require('../models/student');
const Form = require('../models/form');

class StudentDAO {

	// getAll() {
	// 	return Student.knex()
	// 		.raw(
	// 			`
	// 			SELECT DISTINCT on (student.id)
	// 			student.id, student.first_name, student.last_name, student.email, student.grade, form.safe, form.created_at AS form_created_at from student
	// 			LEFT JOIN form on student.id = form.student_id
	// 			ORDER BY student.id, form.created_at DESC;`
	// 		)
	// 		.then((data) => data.rows);
	// }

	getAll() {
		return Student.knex()
			.raw(
				`
				SELECT DISTINCT
				student.id, student.first_name, student.last_name, student.email, student.grade, form.safe, form.created_at AS form_created_at from student
				LEFT JOIN form on student.id = form.student_id
				ORDER BY student.id, form.created_at DESC;`
			)
			.then((data) => data[0]);
	}

	async getOne(id) {
		const student = Student.query()
			.findById(id)
			.select(['id', 'first_name', 'last_name', 'email', 'grade']);

		const [studentData] = await Promise.all([student]);

		if (!studentData) return;

		return {
			...studentData,
		};
	}

	async getOneWithForms(id) {
		const student = Student.query()
			.findById(id)
			.select(['id', 'first_name', 'last_name', 'email', 'grade']);

		const forms = Form.query()
			.select(['id', 'created_at', 'safe'])
			.where('student_id', id)
			.orderBy('created_at', 'DESC');

		const [studentData, formsData] = await Promise.all([student, forms]);

		if (!studentData) return;

		return {
			...studentData,
			forms: formsData,
		};
	}

	create(student) {
		// Input must have: first_name, last_name, email, grade
		return Student.query().insert(student);
	}

	delete(id) {
		return Student.query().deleteById(id);
	}

	update(id, student) {
		// Input can have: first_name, last_name, email, grade
		return Student.query().findById(id).patch(student);
	}

	find(student) {
		// Input must have: first_name, last_name, email, grade
		return Student.query()
			.findOne(student)
			.select('id')
			.then((student) => student?.id);
	}
}

module.exports = new StudentDAO();
