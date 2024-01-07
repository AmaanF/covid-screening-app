const FormController = require('../../controllers/form');
const formSubmission = require('../../schemas/body/formSubmission');
const formUpdate = require('../../schemas/body/formUpdate');
const idParam = require('../../schemas/params/idParam');
const createRouter = require('../../utils/router');

const router = createRouter(
	{
		method: 'get',
		route: '/:id',
		authorization: { admin: false },
		handler: FormController.get,
		paramsValidator: idParam,
	},
	{
		method: 'post',
		route: '/',
		handler: FormController.create,
		bodyValidator: formSubmission,
	},
	{
		method: 'delete',
		route: '/:id',
		authorization: { admin: true },
		handler: FormController.delete,
		paramsValidator: idParam,
	},
	{
		method: 'patch',
		route: '/:id',
		authorization: { admin: true },
		handler: FormController.update,
		paramsValidator: idParam,
		bodyValidator: formUpdate,
	}
);

module.exports = router;
