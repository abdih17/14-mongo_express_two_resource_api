'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Alert = require('../model/alert.js');
const BankAccount = require('../model/bankAccount.js');
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

describe('Bank Account Routes', function() {
  describe('POST: /api/alert/:alertID/bankAccount', function() {
    describe('with a valid alert id and bank account body', () => {
      before( done => {
        new Alert(exampleAlert).save()
        .then( alert => {
          this.tempAlert = alert;
          done();
        })
        .catch(done);
      });

      after( done => {
        Promise.all([
          Alert.remove({}),
          BankAccount.remove({})
        ])
        .then(() => done())
        .catch(done);
      });

      it('should return a bank account', done => {
        request.post(`${url}/api/alert/${this.tempAlert._id}/bankAccount`)
        .send(exampleBankAccount)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.name).to.equal(exampleBankAccount.name);
          expect(res.body.cardNumber).to.equal(exampleBankAccount.cardNumber);
          expect(res.body.alertID).to.not.equal(this.tempAlert._id);
          done();
        });
      });
    });
  });
  describe('GET: /api/bankAccount/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        exampleAlert.timestamp = new Date();
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
        Promise.all([
          Alert.remove({}),
          BankAccount.remove({})
        ])
          .then( () => done())
          .catch(done);
      });

      it('should return a bank account', done => {
        request.get(`${url}/api/bankAccount/${this.tempBankAccount._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test custumor name');
          expect(res.body.cardNumber).to.equal(1234567890);
          done();
        });
      });
    });
  });

  describe('PUT: /api/bankAccount/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        new BankAccount(exampleBankAccount).save()
        .then( bankAccount => {
          this.tempBankAccount = bankAccount;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.tempBankAccount) {
          BankAccount.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should update and return an bank account', done => {
        var updated = { name: 'updated customer name', cardNumber: 987654321234 };

        request.put(`${url}/api/bankAccount/${this.tempBankAccount._id}`)
        .send(updated)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(updated.name);
          expect(res.body.cardNumber).to.equal(updated.cardNumber);
          done();
        });
      });
    });
  });

  describe('DELETE: /api/bankAccount/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        new BankAccount(exampleBankAccount).save()
        .then( bankAccount => {
          this.tempBankAccount = bankAccount;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.tempBankAccount) {
          BankAccount.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should delete the bank account', done => {
        request.delete(`${url}/api/bankAccount/${this.tempBankAccount._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(204);
          expect(res.body).to.be.empty;
          done();
        });
      });
    });
  });
});
