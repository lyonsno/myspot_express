process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
var knex = require('knex')(require('../knexfile'))

describe('routes : all', () => {

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

  // afterEach((done) => {
  //   knex.migrate.rollback()
  //   .then(() => {
  //     done();
  //   });
  // });

  describe('routes : spots', () => {
  // var host = "http://" + process.env.IP + ':' + process.env.PORT;

    var host = "http://127.0.0.1:4000";
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
          count[0]['count(`id`)'].should.equal(4);
        });

        knex.select('*').from('spot').where('id', 4).then(function(values){
          values[0].name.should.equal('my name is robert paulson');
          done();
        });
      });
    });
  });

  describe('routes : lists', () => {  

    var host = "http://127.0.0.1:4000";
    var path = "/api/lists";
    var listId = 1;

    describe('routes : entries', () => {

      beforeEach((done) => {

        knex('entry').del()
        .then( () => {
          knex('list').del()
        })
        .then( () => {  // add a list
          chai.request(host)
          .post('/api/lists')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({newListName: "testlist"})
          .end();
        })
        .then(() => {
          done();
        });
      });

      it('should add new list entry to database', () => {
          chai.request(host)
          .post('/api/lists/1/entries')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({spotId: '1'})
          // confirm database contains new entry
          .then(function(postResponse) {
            knex.select('id').from('spot').where('id', '1')
            .then(function(params) {
              console.log(params);
              params.length.should.equal(1);
            });
          });
        });

      it('should remove a list entry from the database', () => {
        return chai.request(host)
        .post('/api/lists/1/entries')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({spotId: '2'})
        .then(function(postResponse) {
          entryId = postResponse.body.entryId;
          return chai.request(host)
          .delete('/api/lists/1/entries/' + entryId)
        })
        .then(function(deleteResponse) {
          deleteResponse.should.have.status(200);
          return knex.select('*').from('entry').where('id', entryId)
        })
        .then(function(queryResult) {
          console.log(queryResult);
          return expect(queryResult).to.be.empty;
        })
        .catch(function(error) {
          console.info.bind(console);
          console.log("ERROR BY KNEX QUERY: " + error);
          return expect(error).to.be.null;
        })
        .catch(function(error) {
          console.info.bind(console);          
          console.log("ERROR THROWN BY DELETE REQ: " + error);
          return expect(error).to.be.null;
        });
      });

      it('should 404 on requesting non existent entry', () => {
        return chai.request(host)
        .get('/api/lists/1/entries/99')
        .then(function(result) {
            return result.should.have.status(404)
          },
          function(error) {
            return error.response.should.have.status(404);
        });
      });
    });

    //   it('should delete entry from database', (done) => {
    //     chai.request(host)
    //     .del
    //   });
    // });


    it('should respond with all lists', (done) => {
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
          count[0]['count(`id`)'].should.equal(2);
          done();
        });
      });
    });

    it('should successfully add list to database', (done) => {
      chai.request(host)
      .post('/api/lists')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({newListName: 'my name is list'})
      .end((err, res) => {
        // no errors
        should.not.exist(err);
        //status
        res.status.should.equal(200)
        // response type should be json
        res.type.should.equal('application/json');
        // should return three objects
        knex('list').count('id')
        .then(function(count){
          count[0]['count(`id`)'].should.equal(3);
        });
        // insertion successful
        knex.select('*').from('list').where('id', 3).then(function(values){
          values[0].name.should.equal('my name is list');
          done();
        });
      })
    });
  });
});


