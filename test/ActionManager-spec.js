import Sinon from 'sinon';
import Chai, { expect } from 'chai';
import SinonChai from 'sinon-chai';
import DefaultFileLoader from '../src/js/loaders/DefaultFileLoader';
import DefaultActionLoader from '../src/js/loaders/DefaultActionLoader';
import DefaultControllerLoader from '../src/js/loaders/DefaultControllerLoader';
import ActionManager from '../src/js/ActionManager';
Chai.use(SinonChai);

describe('ActionManager', () => {
  let actionManager, fileLoaderStub, actionLoaderStub, controllerLoaderStub;

  beforeEach(() => {
    actionManager = new ActionManager();
    actionManager.path = 'file path';
  });

  describe('#loadControllers', () => {
    let resultControllers, resultObj;
    beforeEach(() => {
      resultObj = {};
      fileLoaderStub = Sinon.createStubInstance(DefaultFileLoader);
      actionManager.fileLoader = fileLoaderStub;
      fileLoaderStub.loadFiles.returns(['valid.js', 'invalid']);

      controllerLoaderStub = Sinon.createStubInstance(DefaultControllerLoader);
      actionManager.controllerLoader = controllerLoaderStub;
      controllerLoaderStub.loadController.withArgs('valid.js').returns(resultObj);
      controllerLoaderStub.loadController.returns(undefined);

      resultControllers = actionManager._loadControllers();
    });

    it('should calling fileloader to load files', () => {
      expect(fileLoaderStub.loadFiles).to.have.been.calledWith('file path');
    });

    it('should calling controller loader to load controller', () => {
      expect(controllerLoaderStub.loadController).to.have.been.calledWith('valid.js');
    });

    it('should return correct controller', () => {
      expect(resultControllers.valid).to.be.eql(resultObj);
      expect(resultControllers.invalid).to.be.undefined;
    });
  });

  describe('#hasController', () => {
    beforeEach(() => {
      Sinon.stub(actionManager, '_loadControllers').returns({valid: {}});
    });

    it('should return true when has the controller', () => {
      expect(actionManager._hasController('valid')).to.be.true;
    });

    it('should return false when given an invalid controller name', () => {
      expect(actionManager._hasController('invalid')).to.be.false;
    });
  });

  describe('#getController', () => {
    let validControler;
    beforeEach(() => {
      validControler = {};
      Sinon.stub(actionManager, '_loadControllers').returns({ valid: validControler });
    });

    it('should return controller when provide a valid name', () => {
      expect(actionManager._getController('valid')).to.be.eql(validControler);
    });

    it('should return undefined when provide an invalid name', () => {
      expect(actionManager._getController('invalid')).to.be.undefined;
    })
  });

  describe('#getAction', () => {
    let validController, validAction;
    beforeEach(() => {
      validController = {};
      validAction = () => {};
      actionLoaderStub = Sinon.createStubInstance(DefaultActionLoader);
      actionManager.actionLoader = actionLoaderStub;
      actionLoaderStub.loadAction.withArgs(validController, 'validAction').returns(validAction);
      actionLoaderStub.loadAction.returns(undefined);

      Sinon.stub(actionManager, '_loadControllers').returns({ validController: validController });
    });

    it('should return an action when provide a valid action name', () => {
      expect(actionManager.getAction('validController#validAction')).to.be.eql(validAction);
    });

    it('should return undefined when given a invalid action name', () => {
      expect(actionManager.getAction('validController#invalidAction')).to.be.undefined;
    });

    it('should return undefined when given a invaild controller name', () => {
      expect(actionManager.getAction('invalidController#validAction')).to.be.undefined;
    });

    it('should return undefined when given a empty handler name', () => {
      expect(actionManager.getAction('')).to.be.undefined;
    });
  });
});
