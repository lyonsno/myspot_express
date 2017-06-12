
exports.up = function(knex, Promise) {
	return knex.schema.createTable('spot', function (t) {
		t.increments('id').primary()
		t.string('name')
		t.integer('creator_id').unsigned().references('id').inTable('user')
		t.timestamps(false, true)
	});
	// .then(function(){
	//     console.log("table " + 'spot' + " created");
	//     return true;
	// }, function(){
	//     console.log("table " + 'spot' + " could not be created");
	//     return false;
	// });  
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('spot')  
};
