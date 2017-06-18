var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile'))

// route middleware that will happen on every request
// router.use(function(req, res, next) {

//     // log each request to the console
//     console.log("");
//     console.log("recieved request:");
//     console.log(req.method, req.url);
//     console.log("");

//     // continue doing what we were doing and go to the route
//     next(); 
// });

/* GET home page. */
{
	router.get('/', function(req, res) {
		res.render('index', { title: 'Express', message: 'Yo Yo port test' });
	});
}

module.exports = router;
