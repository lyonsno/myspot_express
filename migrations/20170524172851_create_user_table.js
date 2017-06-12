
exports.up = function(knex, Promise) {
	return knex.schema.createTable('user', function (t) {
		t.increments('id').primary()
		t.string('username').notNullable()
		t.string('password').notNullable()
		t.timestamps(false, true)
	});
	// .then(function(){
	//     console.log("table " + 'user' + " created");
	//     return true;
	// }, function(){
	//     console.log("table " + 'user' + " could not be created");
	//     return false;
	// });  
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('user')
};
