module.exports = {
	first_name: { type: 'string', maxLength: 255 },
	last_name: { type: 'string', maxLength: 255 },
	email: { type: 'string', format: 'email', maxLength: 255 },
	grade: { type: 'string', maxLength: 255 },
};
