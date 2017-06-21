var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile'))

/* list entries */
{
}

/* lists */
{
	// create new list and add to database
	router.post('/', (req, res) => {
		res.contentType('application/json');
		console.log("about to post list");
		var listName = req.body.newListName;
		knex('list')
		.returning()
		.insert({
			name: listName
		})
		.then(function(params){
			res.status(200).send(params);
		});
	});

	// get json representation of all lists
	router.get('/', (req, res) => {
		res.contentType('application/json');
		knex.select('*').from('list').then(function(params){
			res.status(200).send({'data': params });
		});
	});

	// get all entries from a list
	router.get('/:id/entries', (req, res) => {
		// res.send("success");
		console.log("about to get entries");
		var listId = req.params.id;
		res.contentType('application/json');
		knex('entry').where('list_id', listId)
		.then(function(params){
			console.log(res.err);
			res.status(200).send(params);
		});
	});

	// create new entry and add to database
	router.post('/:id/entries', (req, res) => {
		console.log("about to post entry\n spotId: " + req.body.spotId);
		var listId = req.params.id;
		var spotId = req.body.spotId;
		knex('entry')
		.returning()
		.insert({
			spot_id: spotId,
			list_id: listId
		})
		.on('query-error', function(error, obj) {
			app.log(error);
		})
		.then(function(params){
			res.send(params);
		});
	});

	// remove an entry from the database
	router.delete('/:listId/entries/:entryId', (req, res) => {
		var listId = req.params.listId;
		var entryId = req.params.entryId;
		knex('entry').where('id', entryId).del()
		.on('query-error', function(error, obj) {
  			console.log("ERROR " + error);
		})
		.then(function(params){
			res.sendStatus(200);
		})
		.catch( function(error) {
			console.log("ERROR; " + error)
			res.sendStatus(500);
		});
	})
}

module.exports = router;
