const { hashPassword } = require('../../utils/passwords');

exports.seed = async function (knex) {
	//truncate all existing tables
	// for (const tableName of ['user', 'student', 'form']) {
	// 	await knex.raw(`TRUNCATE TABLE "${tableName}" CASCADE`);
	// }

	await knex('user').insert([
		{
			email: 'admin@example.com',
			password_hash: await hashPassword('Test@1234'),
			admin: true,
		},
		{
			email: 'teacher@example.com',
			password_hash: await hashPassword('Test@1235'),
			admin: false,
		},
	]);

	await knex('student').insert([
		{
			id: 1,
			email: 'student1@example.com',
			first_name: 'student1',
			last_name: 'student1',
			grade: '4a',
		},
		{
			id: 2,
			email: 's2@example.com',
			first_name: 's2',
			last_name: 's2',
			grade: '4a',
		},
		{
			id: 3,
			email: 's3@example.com',
			first_name: 's3',
			last_name: 's3',
			grade: '4a',
		},
		{
			id: 4,
			email: 's4@s.com',
			first_name: 's4',
			last_name: 's4',
			grade: '4a',
		},
		{
			id: 5,
			email: 's5@s.com',
			first_name: 's5',
			last_name: 's5',
			grade: '4a',
		},
	]);

	await knex('form').insert([
		{
			student_id: 1,
			question_1: false,
			question_2: false,
			question_3: false,
			question_4: false,
			question_5: false,
			question_6: false,
			symptom_1: false,
			symptom_2: false,
			symptom_3: false,
			symptom_4: false,
			symptom_5: false,
		},
		{
			student_id: 2,
			question_1: false,
			question_2: false,
			question_3: false,
			question_4: false,
			question_5: false,
			question_6: false,
			symptom_1: false,
			symptom_2: false,
			symptom_3: false,
			symptom_4: false,
			symptom_5: false,
		},
		{
			student_id: 3,
			question_1: false,
			question_2: false,
			question_3: false,
			question_4: false,
			question_5: false,
			question_6: false,
			symptom_1: false,
			symptom_2: false,
			symptom_3: false,
			symptom_4: false,
			symptom_5: false,
		},
		{
			student_id: 4,
			question_1: false,
			question_2: false,
			question_3: false,
			question_4: false,
			question_5: false,
			question_6: false,
			symptom_1: false,
			symptom_2: false,
			symptom_3: false,
			symptom_4: false,
			symptom_5: true,
		},
	]);
};