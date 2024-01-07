const AuthenticationController = require('../../controllers/authentication');
const login = require('../../schemas/body/login');
const password = require('../../schemas/body/password');
const refreshToken = require('../../schemas/body/refreshToken');
const createRouter = require('../../utils/router');

const router = createRouter(
	{
		method: 'post',
		route: '/login',
		handler: AuthenticationController.login,
		bodyValidator: login,
	},
	{
		method: 'post',
		route: '/logout',
		handler: AuthenticationController.logout,
		bodyValidator: refreshToken,
	},
	{
		method: 'post',
		route: '/hard-logout',
		authorization: { admin: false },
		handler: AuthenticationController.hardLogout,
	},
	{
		method: 'post',
		route: '/access-token',
		handler: AuthenticationController.accessToken,
		bodyValidator: refreshToken,
	},
	{
		method: 'patch',
		route: '/change-password',
		authorization: { admin: false },
		handler: AuthenticationController.changePassword,
		bodyValidator: password,
	}
);

module.exports = router;
