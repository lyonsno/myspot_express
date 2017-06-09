
exports.up = function(knex, Promise) {
	return knex.schema.createTable('list', function (t) {
		t.increments('id').primary()
		t.string('name')
		t.integer('creator_id').unsigned().references('id').inTable('user')
		t.timestamps(false, true)
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('list');
};
