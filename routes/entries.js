var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile'));

/* list entries */
{
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

	// get all entries from a list
	router.get('/api/lists/:id/entries', (req, res) => {
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

	router.get('/api', (req, res) => {
		res.send('monkeyBuisness');
	});
}

module.exports = router;