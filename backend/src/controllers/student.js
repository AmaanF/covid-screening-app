const ApiError = require('../error/ApiError');
const StudentService = require('../services/student');

class StudentController {
	getAll(req, res, next) {
		StudentService.getAll()
			.then((students) => res.json(students))
			.catch((err) => next(err));
	}

	getOne(req, res, next) {
		StudentService.getOne(req.params.id)
			.then((student) =>
				student ? res.json(student) : next(ApiError.notFound())
			)
			.catch((err) => next(err));
	}

	getOneWithForms(req, res, next) {
		StudentService.getOneWithForms(req.params.id)
			.then((student) =>
				student ? res.json(student) : next(ApiError.notFound())
			)
			.catch((err) => next(err));
	}

	create(req, res, next) {
		StudentService.create(req.body)
			.then(() => res.status(201).json('Student created successfully.'))
			.catch((err) => next(err));
	}

	delete(req, res, next) {
		StudentService.delete(req.params.id)
			.then(() => res.json('Student deleted successfully.'))
			.catch((err) => next(err));
	}

	update(req, res, next) {
		StudentService.update(req.params.id, req.body)
			.then(() => res.json('Student updated successfully.'))
			.catch((err) => next(err));
	}
}

module.exports = new StudentController();
