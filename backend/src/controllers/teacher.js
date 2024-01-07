const TeacherService = require('../services/teacher');

class TeacherController {
	getAll(req, res, next) {
		TeacherService.getAll()
			.then((teachers) => res.json(teachers))
			.catch((err) => next(err));
	}

	getById(req, res, next) {
		TeacherService.getById(req.params.id)
			.then((teachers) => res.json(teachers))
			.catch((err) => next(err));
	}

	create(req, res, next) {
		TeacherService.create(req.body)
			.then(() => res.status(201).json('Teacher created successfully.'))
			.catch((err) => next(err));
	}

	delete(req, res, next) {
		TeacherService.delete(req.params.id)
			.then(() => res.json('Teacher deleted successfully.'))
			.catch((err) => next(err));
	}

	update(req, res, next) {
		TeacherService.update(req.params.id, req.body)
			.then(() => res.json('Teacher updated successfully.'))
			.catch((err) => next(err));
	}
}

module.exports = new TeacherController();
