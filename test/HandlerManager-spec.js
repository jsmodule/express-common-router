import Sinon from 'sinon';
import Chai, { expect } from 'chai';
import SinonChai from 'sinon-chai';
import DefaultFileLoader from '../src/js/loaders/DefaultFileLoader';
import DefaultActionLoader from '../src/js/loaders/DefaultActionLoader';
import DefaultHandlerLoader from '../src/js/loaders/DefaultHandlerLoader';
import HandlerManager from '../src/js/HandlerManager';
Chai.use(SinonChai);

describe('HandlerManager', () => {
  let handlerManager, fileLoaderStub, actionLoaderStub, handlerLoaderStub;

  beforeEach(() => {
    handlerManager = new HandlerManager();
    handlerManager.path = 'file path';
  });

  describe('#loadHandlers', () => {
    let resultHandlers, resultObj;
    beforeEach(() => {
      resultObj = {};
      fileLoaderStub = Sinon.createStubInstance(DefaultFileLoader);
      handlerManager.fileLoader = fileLoaderStub;
      fileLoaderStub.loadFiles.returns(['valid.js', 'invalid']);

      handlerLoaderStub = Sinon.createStubInstance(DefaultHandlerLoader);
      handlerManager.handlerLoader = handlerLoaderStub;
      handlerLoaderStub.loadHandler.withArgs('valid.js').returns(resultObj);
      handlerLoaderStub.loadHandler.returns(undefined);

      resultHandlers = handlerManager._loadHandlers();
    });

    it('should calling fileloader to load files', () => {
      expect(fileLoaderStub.loadFiles).to.have.been.calledWith('file path');
    });

    it('should calling handler loader to load handler', () => {
      expect(handlerLoaderStub.loadHandler).to.have.been.calledWith('valid.js');
    });

    it('should return correct handler', () => {
      expect(resultHandlers.valid).to.be.eql(resultObj);
      expect(resultHandlers.invalid).to.be.undefined;
    });
  });

  describe('#hasHandler', () => {
    beforeEach(() => {
      Sinon.stub(handlerManager, '_loadHandlers').returns({valid: {}});
    });

    it('should return true when has the handler', () => {
      expect(handlerManager._hasHandler('valid')).to.be.true;
    });

    it('should return false when given an invalid handler name', () => {
      expect(handlerManager._hasHandler('invalid')).to.be.false;
    });
  });

  describe('#getHandler', () => {
    let validHandler;
    beforeEach(() => {
      validHandler = {};
      Sinon.stub(handlerManager, '_loadHandlers').returns({ valid: validHandler });
    });

    it('should return a valid handler when provide a valid name', () => {
      expect(handlerManager._getHandler('valid')).to.be.eql(validHandler);
    });

    it('should return undefined when provide an invalid name', () => {
      expect(handlerManager._getHandler('invalid')).to.be.undefined;
    })
  });

  describe('#getHandlerAction', () => {
    let validHandler, validAction;
    beforeEach(() => {
      validHandler = {};
      validAction = () => {};
      actionLoaderStub = Sinon.createStubInstance(DefaultActionLoader);
      handlerManager.actionLoader = actionLoaderStub;
      actionLoaderStub.loadAction.withArgs(validHandler, 'validAction').returns(validAction);
      actionLoaderStub.loadAction.returns(undefined);

      Sinon.stub(handlerManager, '_loadHandlers').returns({ validHandler: validHandler });
    });

    it('should return an action when provide a valid action name', () => {
      expect(handlerManager.getHandlerAction('validHandler#validAction')).to.be.eql(validAction);
    });

    it('should return undefined when given a invalid action name', () => {
      expect(handlerManager.getHandlerAction('validHandler#invalidAction')).to.be.undefined;
    });

    it('should return undefined when given a invaild handler name', () => {
      expect(handlerManager.getHandlerAction('invalidHandler#validAction')).to.be.undefined;
    });

    it('should return undefined when given a empty handler name', () => {
      expect(handlerManager.getHandlerAction('')).to.be.undefined;
    });
  });
});
