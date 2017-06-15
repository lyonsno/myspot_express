var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile'));

/* spots */
{
	// create a new spot
	router.post('/', (req, res) => {
		res.contentType('application/json');
		var spotName = req.body.newSpotName;
		knex('spot')
		.returning()
		.insert({
			name: spotName
		})
		.then(function(params){
			res.send(params).status(200);
		});
	});

	//get all spots
	router.get('/', (req, res) => {
		console.log("GET request recieved by /api/spots")
		res.contentType('application/json');
		var params = knex.select('*').from('spot').then(function(params){
			res.status(200).send({ 'data': params });
		});
	});

	//view page of all spots
	router.get('/view', (req, res) => {
		knex.select('*').from('spot').then(function(values)
		{
			res.render('spots',
			{
				allSpots: values
			});
		});
	});

	//access spot page by spot name
	router.get('/name/:spotName/', (req, res) => {
		var spotName = req.params.spotName
		knex.select('*').from('spot').where('name', spotName).then(function(values){
		// res.send(values);
			res.render('spot', 
			{ 
				name: spotName,
				id: values[0].id
			});
		});
	});

		//get spot by id
	router.get('/id/:spotId/', (req, res) => {
		var spotId = req.params.spotId
		knex.select('*').from('spot').where('id', spotId)
		.then(function(values){
			res.status(200).send(values);
		});
	});	
}

module.exports = router;