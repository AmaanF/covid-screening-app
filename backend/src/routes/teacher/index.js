const TeacherController = require('../../controllers/teacher');
const teacherSubmission = require('../../schemas/body/teacherSubmission');
const teacherUpdate = require('../../schemas/body/teacherUpdate');
const idParam = require('../../schemas/params/idParam');
const createRouter = require('../../utils/router');

const router = createRouter(
	{
		method: 'get',
		route: '/',
		authorization: { admin: true },
		handler: TeacherController.getAll,
	},
	{
		method: 'get',
		route: '/:id',
		authorization: { admin: true },
		handler: TeacherController.getById,
		paramsValidator: idParam,
	},
	{
		method: 'post',
		route: '/',
		authorization: { admin: true },
		handler: TeacherController.create,
		bodyValidator: teacherSubmission,
	},
	{
		method: 'delete',
		route: '/:id',
		authorization: { admin: true },
		handler: TeacherController.delete,
		paramsValidator: idParam,
	},
	{
		method: 'patch',
		route: '/:id',
		authorization: { admin: true },
		handler: TeacherController.update,
		paramsValidator: idParam,
		bodyValidator: teacherUpdate,
	}
);

module.exports = router;
