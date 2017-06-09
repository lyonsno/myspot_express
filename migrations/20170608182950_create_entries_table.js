
exports.up = function(knex, Promise) {
	return knex.schema.createTable('entry', function (t) {
		t.increments('id').primary()
		t.integer('spot_id').unsigned().references('id').inTable('spot')
		t.integer('list_id').unsigned().references('id').inTable('list')
		t.timestamps(false, true)
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('entry');
};
