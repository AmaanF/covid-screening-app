const { hashPassword } = require('./passwords');

async function hashPasswordOnObject(obj) {
	const passwordHash = await hashPassword(obj.password);
	delete obj.password;
	obj['password_hash'] = passwordHash;
}

module.exports = hashPasswordOnObject;
