const ApiError = require('../error/ApiError');
const FormService = require('../services/form');

class FormController {
	get(req, res, next) {
		FormService.get(req.params.id)
			.then((form) => (form ? res.json(form) : next(ApiError.notFound())))
			.catch((err) => next(err));
	}

	create(req, res, next) {
		FormService.create(req.body)
			.then(() => res.status(201).json('Form submitted successfully.'))
			.catch((err) => next(err));
	}

	delete(req, res, next) {
		FormService.delete(req.params.id)
			.then(() => res.json('Form deleted successfully.'))
			.catch((err) => next(err));
	}

	update(req, res, next) {
		FormService.update(req.params.id, req.body)
			.then(() => res.json('Form updated successfully.'))
			.catch((err) => next(err));
	}
}

module.exports = new FormController();
