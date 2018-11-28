const sinon = require('sinon');
const { assert } = require('chai');

const { User } = require('../user/model');
const { dropDb } = require('../../../config/testHelpers');
const controller = require('./controller');

describe('auth/controller', () => {
  describe('signup', () => {
    let req;
    let res;
    let next;
    beforeEach(async () => {
      await dropDb();

      req = {};
      res = {
        status: sinon.stub().returns({
          json: sinon.stub().returns()
        })
      };
      next = sinon.stub().resolves();
    });

    afterEach(async () => {
      await dropDb();
    });

    describe('User successfully signs up', () => {
      beforeEach(() => {
        req.body = {
          username: 'alicia',
          email: 'alicia@cc.cc',
          password: 'somepass'
        };
      });

      it('should sends the created user with token', async () => {
        try {
          await controller.signup(req, res, next);
          assert.equal(res.status().json.getCall(0).args[0].username, 'alicia');
          assert.equal(
            res.status().json.getCall(0).args[0].email,
            'alicia@cc.cc'
          );
          assert.exists(res.status().json.getCall(0).args[0].token);
        } catch (err) {
          assert(false);
        }
      });

      it('should have one user in db', async () => {
        try {
          await controller.signup(req, res, next);

          const users = await User.find({});
          assert.equal(users.length, 1);
          assert.equal(users[0].username, 'alicia');
        } catch (err) {
          assert(false);
        }
      });
    });

    describe('User fails to signup', () => {
      beforeEach(() => {
        req.body = {};
      });

      it('should have no user', async () => {
        try {
          await controller.signup(req, res, next);
        } catch (err) {
          const users = await User.find({});
          assert.equal(res.status().json.calledOnce, false);
          assert.equal(users.length, 0);
        }
      });
    });
  });
});
