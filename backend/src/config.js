const argon2 = require('argon2');

module.exports = {
	question_columns: [...Array(6).keys()].map((x) => `question_${x + 1}`),
	symptom_columns: [...Array(5).keys()].map((x) => `symptom_${x + 1}`),
	argon2Config: {
		type: argon2.argon2id,
		memoryCost: 2 ** 16,
		timeCost: 3,
		parallelism: 1,
	},
};
