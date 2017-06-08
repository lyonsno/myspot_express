var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile'))

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express', message: 'Yo Yo' });
});

router.post('/api/spots', (req, res) => {
	var spotName = req.body.spotName;
	knex('spot')
	.returning('id')
	.insert({
		name: spotName
	})
	.then(function(params){
		res.send(req.body);
		res.sendStatus(200);
	});
});

router.get('/api/spots', (req, res) => {
	res.contentType('application/json');
	var params = knex.select('*').from('spot').then(function(params){
		res.send(params[0]);
	});
});

//access spot by id
router.get('/api/spots/:spotId/', (req, res) => {
	var spotId = req.params.spotId
	knex.select('*').from('spot').where('id', spotId)
	.then(function(values){
		res.send(values);
	});
});	

//access spot page by spot name
router.get('/spots/:spotName/', (req, res) => {
	var spotName = req.params.spotName
	knex.select('*').from('spot').where('name', spotName).then(function(values){
	res.render('spot', { name: spotName})
	});
});

router.get('/monkey/bear/:potato/:robots', function (req, res) {
	var thing = `${req.params.potato} ${req.params.robots}`
	res.render(
		'index',
		{
			title: thing,
			message: thing
		})
})

module.exports = router;
