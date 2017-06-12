var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile'))

/* GET home page. */
{
	router.get('/', function(req, res) {
		res.render('index', { title: 'Express', message: 'Yo Yo' });
	});
}

/* spots */
{
	// create a new spot
	router.post('/api/spots', (req, res) => {
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
	router.get('/api/spots', (req, res) => {
		res.contentType('application/json');
		var params = knex.select('*').from('spot').then(function(params){
			res.status(200).send({ 'data': params });
		});
	});

	//get spot by id
	router.get('/api/spots/:spotId/', (req, res) => {
		var spotId = req.params.spotId
		knex.select('*').from('spot').where('id', spotId)
		.then(function(values){
			res.status(200).send(values);
		});
	});	

	//view page of all spots
	router.get('/spots', (req, res) => {
		knex.select('*').from('spot').then(function(values)
		{
			res.render('spots',
			{
				allSpots: values
			});
		});
	});

	//access spot page by spot name
	router.get('/spots/:spotName/', (req, res) => {
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
}

/* lists */
{
	router.post('/api/lists', (req, res) => {
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

	router.get('/api/lists', (req, res) => {
		res.contentType('application/json');
		knex.select('*').from('list').then(function(params){
			res.status(200).send({'data': params });
		});
	});
}

module.exports = router;
