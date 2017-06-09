process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('routes : spots', () => {

  beforeEach((done) => {
    // knex.migrate.rollback()
    // .then(() => {
    //   knex.migrate.latest()
    //   .then(() => {
    //     knex.seed.run()
    //     .then(() => {
    //       done();
    //     })
    //   });
    // });
  });

  afterEach((done) => {
    // knex.migrate.rollback()
    // .then(() => {
    //   done();
    // });
  });

});

describe('GET /api/spots', () => {
  // var host = "http://" + process.env.IP + ':' + process.env.PORT;
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
      res.body.data.length.should.eql(44);
      // the first object in the data array should
      // have the right keys
      res.body.data[0].should.include.keys(
        'id', 'name', 'creator_id', 'created_at', 'updated_at'
      );
      done();
    });
  });
});