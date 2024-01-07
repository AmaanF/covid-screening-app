const UserDAO = require('../dao/user');
//const RefreshTokenDAO = require('../dao/refreshToken');
const hashPasswordOnObject = require('../utils/hashPasswordOnObject');

class TeacherService {
	getAll() {
		return UserDAO.getAllTeachers();
	}


	getById(id) {
		return UserDAO.getById(id);
	}

	async create(teacher) {
		await hashPasswordOnObject(teacher);

		return UserDAO.createTeacher(teacher);
	}

	async delete(id) {
		//await RefreshTokenDAO.deleteAllRefreshTokens(id);
		await UserDAO.deleteTeacher(id);
	}

	async update(id, teacher) {
		if (teacher.password !== undefined) await hashPasswordOnObject(teacher);

		await UserDAO.updateTeacher(id, teacher);
	}
}

module.exports = new TeacherService();
