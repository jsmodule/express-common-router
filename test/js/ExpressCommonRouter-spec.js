import sinon from 'sinon';
import chai, { expect } from 'chai';
import SinonChai from 'sinon-chai';
import express from 'express';
import methods from 'methods';
import ActionsManager from '../../src/js/ActionsManager';
import ExpressCommonRouter from '../../src/js/ExpressCommonRouter';
chai.use(SinonChai);

describe('ExpressCommonRouter', () => {
  let expressCommonRouter, stubRouter, router, stubActionsManager;

  before(() => {
    stubRouter = sinon.stub(express, 'Router');
    stubActionsManager = sinon.createStubInstance(ActionsManager);
  });

  describe('#routes', () => {
    beforeEach(() => {
      router = {};
      stubRouter.returns(router);
      expressCommonRouter = new ExpressCommonRouter();
    });

    it('should create a router', () => {
      expect(stubRouter).to.have.been.called;
    });

    it('should return all routes when calling routes method', () => {
      expect(expressCommonRouter.routes()).to.be.equal(router);
    });
  });

  methods.concat('use').forEach((method) => {
    describe('#' + method, () => {
      let spy, actionSpy;

      beforeEach(() => {
        router = {};
        router[method] = () => {};
        spy = sinon.spy(router, method);
        actionSpy = sinon.spy();
        stubRouter.returns(router);
        stubActionsManager.getAction.withArgs('handlerName').returns(actionSpy);
        stubActionsManager.getAction.returns(undefined);
        expressCommonRouter = new ExpressCommonRouter();
        expressCommonRouter.actionsManager = stubActionsManager;
      });

      it(`should pass correct parameter to invoke ${method} method of router when got a valid action with handler name`, () => {
        expressCommonRouter[method].call(expressCommonRouter, '/', 'handlerName');
        expect(spy).to.have.been.calledWith('/', actionSpy);
      });

      it('should throw a error when got a invalid action with handler name', () => {
        expect(expressCommonRouter[method]).to.throw(TypeError);
      });
    });
  });
});
