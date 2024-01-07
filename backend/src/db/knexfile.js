module.exports = {
	// development: {
	// 	client: 'postgresql',
	// 	connection: {
	// 		database: 'covid_screening',
	// 		user: 'node',
	// 		password: 'node',
	// 	},
	// 	pool: {
	// 		min: 2,
	// 		max: 10,
	// 	},
	// 	migrations: {
	// 		tableName: 'knex_migrations',
	// 	},
	// 	seeds: {
	// 		directory: './seeds',
	// 	},
	// },
	development: {
		client: 'mysql',
		connection: {
			host: 'isnacoviddb.cwl0yhbkuhpu.us-east-1.rds.amazonaws.com',
			database: 'covidscreening',
			user: 'proadminpro',
			password: 'screen!ngApp123',
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
		seeds: {
			directory: './seeds',
		},
	},
	production: {
		client: 'mysql',
		connection: {
			host: 'isnacoviddb.cwl0yhbkuhpu.us-east-1.rds.amazonaws.com',
			database: 'covidscreening',
			user: 'proadminpro',
			password: 'screen!ngApp123',
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
		seeds: {
			directory: './seeds',
		},
	},
};
