
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('spot').del()
    .then( () => {
      // Inserts seed entries
      return Promise.all([
        knex('spot').insert({id: 1, name: 'rowValue1'}),
        knex('spot').insert({id: 2, name: 'rowValue2'}),
        knex('spot').insert({id: 3, name: 'rowValue3'})
      ]);
    });
};
