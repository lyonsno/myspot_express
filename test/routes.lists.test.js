process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
var knex = require('knex')(require('../knexfile'))

describe('routes : lists', () => {
	beforeEach((done) => {
		knex.migrate.rollback()
		.then(() => {
			knex.migrate.latest()
			.then(() => {
				knex.seed.run()
				.then(() => {
					done();
				});
			});
		});
	});

	afterEach((done) => {
		knex.migrate.rollback()
		.then(() => {
			done();
		});
	});

	var host = "http://127.0.0.1:3000";
	var path = "/api/lists";

	it('sould respond with all lists', (done) => {
		chai.request(host)
		.get('/api/spots')
		.end((err, res) => {
			should.not.exist(err);
			res.status.should.equal(200);
			res.type.should.equal('application/json');
			res.body.data[0].should.include.keys(
				'id', 'name', 'creator_id', 'created_at', 'updated_at'
			);
			knex('list').count('id').then(function(count){
				console.log(count);
				count[0]['count(`id`)'].should.equal(2);
				done();
			});
		});
	});
});