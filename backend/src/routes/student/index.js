const StudentController = require('../../controllers/student');
const studentSubmission = require('../../schemas/body/studentSubmission');
const studentUpdate = require('../../schemas/body/studentUpdate');
const idParam = require('../../schemas/params/idParam');
const createRouter = require('../../utils/router');

const router = createRouter(
	{
		method: 'get',
		route: '/',
		authorization: { admin: false },
		handler: StudentController.getAll,
	},
	{
		method: 'get',
		route: '/:id',
		authorization: { admin: false },
		handler: StudentController.getOne,
		paramsValidator: idParam,
	},
	{
		method: 'get',
		route: '/details/:id',
		authorization: { admin: false },
		handler: StudentController.getOneWithForms,
		paramsValidator: idParam,
	},
	{
		method: 'post',
		route: '/',
		authorization: { admin: true },
		handler: StudentController.create,
		bodyValidator: studentSubmission,
	},
	{
		method: 'delete',
		route: '/:id',
		authorization: { admin: true },
		handler: StudentController.delete,
		paramsValidator: idParam,
	},
	{
		method: 'patch',
		route: '/:id',
		authorization: { admin: true },
		handler: StudentController.update,
		paramsValidator: idParam,
		bodyValidator: studentUpdate,
	}
);

module.exports = router;
