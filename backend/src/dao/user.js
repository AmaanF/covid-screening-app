const User = require('../models/user');

class UserDAO {
	findByEmail(email) {
		return User.query()
			.findOne({ email })
			.select('id', 'password_hash', 'admin');
	}

	// Teachers
	getAllTeachers() {
		return User.query()
			.select(['id', 'email', 'created_at'])
			.where('admin', false);
	}

	getById(id) {
		return User.query()
			.findById(id)	
			.select(['id', 'email', 'created_at'])
			.where('admin', false);
	}

	createTeacher(teacher) {
		// Input must have: email, password_hash
		return User.query().insert({ ...teacher, admin: false });
	}

	deleteTeacher(id) {
		return User.query().deleteById(id).where('admin', false);
	}

	updateTeacher(id, teacher) {
		// Input can have: email, password_hash
		return User.query().findById(id).update(teacher).where('admin', false);
	}

	update(id, user) {
		return User.query().findById(id).update(user);
	}
}

module.exports = new UserDAO();
