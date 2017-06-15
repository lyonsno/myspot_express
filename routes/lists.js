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
		console.log("about to post list");
		var listName = req.body.newListName;
		knex('list')
		.returning('id')
		.insert({
			name: listName
		})
		.then(function(params){
			res.send(req.body);
			res.sendStatus(200);
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
			console.log(res.error);
			res.status(200).send(params);
		});
	});

	// create new entry and add to database
	router.post('/api/lists/:id/entries', (req, res) => {
		console.log("about to post entry");
		var listId = id;
		var spotId = req.body.spotId;
		knex('entry')
		.returning('id')
		.insert({
			spot_id: spotId,
			list_id: listId
		})
		.then(function(params){
			res.status(200).send(params);
		});
	});
}

module.exports = router;