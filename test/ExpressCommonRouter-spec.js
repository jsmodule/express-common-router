import Sinon from 'sinon';
import Chai, { expect } from 'chai';
import SinonChai from 'sinon-chai';
import Express from 'express';
import methods from 'methods';
import HandlerManager from '../src/js/HandlerManager';
import ExpressCommonRouter from '../src/js/ExpressCommonRouter';
Chai.use(SinonChai);

describe('ExpressCommonRouter', () => {
  let expressCommonRouter, stubRouter, router, stubHandlerManager;

  before(() => {
    stubRouter = Sinon.stub(Express, 'Router');
    stubHandlerManager = Sinon.createStubInstance(HandlerManager);
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

  methods.concat('all', 'use').forEach((method) => {
    describe('#' + method, () => {
      let spy, actionSpy;

      beforeEach(() => {
        router = {};
        router[method] = () => {};
        spy = Sinon.spy(router, method);
        actionSpy = Sinon.spy();
        stubRouter.returns(router);
        stubHandlerManager.getHandlerAction.withArgs('handlerPath').returns(actionSpy);
        stubHandlerManager.getHandlerAction.returns(undefined);
        expressCommonRouter = new ExpressCommonRouter();
        expressCommonRouter.manager = stubHandlerManager;
      });

      it(`should pass correct parameter to invoke ${method} method of router when got a valid action with handler path`, () => {
        expressCommonRouter[method].call(expressCommonRouter, '/', 'handlerPath');
        expect(spy).to.have.been.calledWith('/', actionSpy);
      });

      it('should throw a error when got a invalid action with handler path', () => {
        expect(expressCommonRouter[method]).to.throw(TypeError);
      });
    });
  });
});
