
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('list').del()
      .then( () => {
        return Promise.all([
          knex('list').insert({id: 1, name: 'listOne'}),
          knex('list').insert({id: 2, name: 'listTwo'})
        ]);
      });
};
