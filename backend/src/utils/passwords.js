const argon2 = require('argon2');
const { argon2Config } = require('../config');

function hashPassword(password) {
	return argon2.hash(password, argon2Config);
}

function verifyPassword(password, passwordHash) {
	return argon2.verify(passwordHash, password, argon2Config);
}

module.exports = {
	hashPassword,
	verifyPassword,
};
