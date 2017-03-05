'use strict';

const expect = require('chai').expect;
const request = require('superagent');

const Alert = require('../model/alert.js');
// const BankAccount = require('../model/bankAccount.js');

const PORT = process.env.PORT || 3000;

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleBankAccount = {
  name: 'test custumor name',
  cardNumber: 1234567890
};

const exampleAlert = {
  content: 'example alert',
  timestamp: new Date()
};

describe('Alert Routes', function() {
  describe('POST: /api/alert', function() {
    describe('with a valid body', function() {
      after( done => {
        if (this.tempAlert) {
          Alert.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return an alert', done => {
        request.post(`${url}/api/alert`)
        .send(exampleAlert)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.content).to.equal('example alert');
          this.tempAlert = res.body;
          done();
        });
      });

      describe('with invalid body', function() {
        it('should return 400 code', done => {
          request.post(`${url}/api/alert`)
          .end((err, res) => {
            expect(err).to.be.an('error');
            expect(res.status).to.equal(400);
            done();
          });
        });
      });
    });
  });

  describe('GET: /api/alert/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        new Alert(exampleAlert).save()
        .then( alert => {
          this.tempAlert = alert;
          return Alert.findByIdAndAddBankAccount(alert._id, exampleBankAccount);
        })
        .then( bankAccount => {
          this.tempBankAccount = bankAccount;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.tempAlert) {
          Alert.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a alert', done => {
        request.get(`${url}/api/alert/${this.tempAlert._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.content).to.equal('example alert');
          expect(res.body.bankAccounts.length).to.equal(1);
          expect(res.body.bankAccounts[0].content).to.equal(exampleBankAccount.content);
          done();
        });
      });

      describe('invalid request', function() {
        it('should return a 404 code', done => {
          request.get(`${url}/api/alert`)
          .end((err, res) => {
            expect(err).to.be.an('error');
            expect(res.status).to.equal(404);
            done();
          });
        });
      });
    });
  });

  describe('PUT: /api/alert/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        new Alert(exampleAlert).save()
        .then( alert => {
          this.tempAlert = alert;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.tempAlert) {
          Alert.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a alert', done => {
        var updated = { content: 'updated alert' };

        request.put(`${url}/api/alert/${this.tempAlert._id}`)
        .send(updated)
        .end((err, res) => {
          if (err) return done(err);
          let timestamp = new Date(res.body.timestamp);
          expect(res.status).to.equal(200);
          expect(res.body.content).to.equal(updated.content);
          expect(timestamp.toString()).to.equal(exampleAlert.timestamp.toString());
          done();
        });
      });

      describe('with an invalid request', () => {
        it('should return a 404 code', done => {
          request.put(`${url}/api/alert/`)
          .send({content:'update content'})
          .end((err, res) => {
            expect(err).to.be.an('error');
            expect(res.status).to.equal(404);
            done();
          });
        });
      });
    });
  });

  describe('DELETE: /api/alert/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        new Alert(exampleAlert).save()
        .then( alert => {
          this.tempAlert = alert;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.tempAlert) {
          Alert.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a alert', done => {
        request.delete(`${url}/api/alert/${this.tempAlert._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(204);
          expect(res.body.content).to.be.empty;
          done();
        });
      });

      describe('invalid request', function() {
        it('should return 404 code', done => {
          request.delete(`${url}/api/size`)
          .end((err, res) => {
            expect(err).to.be.an('error');
            expect(res.status).to.equal(404);
            done();
          });
        });
      });
    });
  });
});
