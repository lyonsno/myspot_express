
exports.up = function(knex, Promise) {
	return knex.schema.createTable('list', function (t) {
		t.increments('id').primary()
		t.string('name')
		t.integer('creator_id').unsigned().references('id').inTable('user')
		t.timestamps(false, true)
	}).then(function(){
		    console.log("table " + 'list' + " created");
		    return true;
		}, function(){
		    console.log("table " + 'list' + " could not be created");
		    return false;
		});  
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('list')  
};
