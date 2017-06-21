module.exports = {
	client: 'mysql',
	connection: {
		user: 'root',
		password: 'password',
		database: 'myspot'
	},
	seeds: {
		directory: __dirname + '/db/seeds'
	}
	// ,debug: true
}