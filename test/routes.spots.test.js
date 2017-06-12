process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
var knex = require('knex')(require('../knexfile'))

describe('routes : spots', () => {
  // var host = "http://" + process.env.IP + ':' + process.env.PORT;

    beforeEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => {
        knex.seed.run()
        .then(() => {
          done();
        })
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
  var path = "/api/spots";

  it('should respond with all spots', (done) => {
    chai.request(host)
    .get('/api/spots')
    .end((err, res) => {
      // there should be no errors
      should.not.exist(err);
      // there should be a 200 status code
      res.status.should.equal(200);
      // the response should be JSON
      res.type.should.equal('application/json');
      // the JSON response body should have a
      // key-value pair of {"status": "success"}
      res.body.data.length.should.eql(3);
      // the first object in the data array should
      // have the right keys
      res.body.data[0].should.include.keys(
        'id', 'name', 'creator_id', 'created_at', 'updated_at'
      );
      done();
    });
  });

      console.log('handeling post');
  it('should successfully add spot to database' , (done) => {
    chai.request(host)
    .post('/api/spots')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({newSpotName: 'my name is robert paulson'})
    .end((err, res) => {
      // no errors
      should.not.exist(err);  
      // status 200
      res.status.should.equal(200);
      // response type should be json
      res.type.should.equal('application/json');
      // should return four objects
      knex('spot').count('id').then(function(count){
        console.log(count);
        count[0]['count(`id`)'].should.equal(4);
      });

      knex.select('*').from('spot').where('id', 4).then(function(values){
        values[0].name.should.equal('my name is robert paulson');
        done();
      });

      // should have the right keys
      // res.body.data[0].should.include.keys(
        // 'id', 'name', 'creator_id', 'created_at', 'updated_at'
    });
  });
});
