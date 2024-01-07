const { question_columns, symptom_columns } = require('../../config');

exports.up = async function (knex) {
	const result = await knex.schema
		.createTable('user', (t) => {
			t.increments();
			t.string('email').notNullable().unique();
			t.string('password_hash').notNullable();
			t.boolean('admin').notNullable();
			t.timestamps(true, true);
		})
		.createTable('student', (t) => {
			t.increments();
			t.string('email').notNullable().unique();
			t.string('first_name').notNullable();
			t.string('last_name').notNullable();
			t.string('grade').notNullable();
			t.timestamps(true, true);
		})
		.createTable('form', (t) => {
			t.increments();
			t.integer('student_id')
				.notNullable()
				.references('id')
				.inTable('student');
			question_columns.forEach((question) =>
				t.boolean(question).notNullable()
			);
			symptom_columns.forEach((symptom) =>
				t.boolean(symptom).notNullable()
			);
			t.timestamps(true, true);
		});

	const computedColumn = `(NOT (${question_columns.join(
		' OR '
	)} OR ${symptom_columns.join(' OR ')}))`;

	await knex.raw(
		`ALTER TABLE form ADD safe boolean GENERATED ALWAYS AS ${computedColumn} STORED;`
	);

	return result;
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('form')
		.dropTableIfExists('student')
		.dropTableIfExists('user');
};
