import sinon from 'sinon';
import chai, { expect } from 'chai';
import SinonChai from 'sinon-chai';
import DefaultFileLoader from '../../src/js/DefaultFileLoader';
import DefaultActionLoader from '../../src/js/DefaultActionLoader';
import DefaultControllerLoader from '../../src/js/DefaultControllerLoader';
import ActionsManager from '../../src/js/ActionsManager';
chai.use(SinonChai);

describe('ActionsManager', () => {
  let actionsManager, fileLoaderStub, actionLoaderStub, controllerLoaderStub;

  beforeEach(() => {
    actionsManager = new ActionsManager();
    actionsManager.controllerPath = 'file path';
  });

  describe('#loadControllers', () => {
    let resultControllers, resultObj;
    beforeEach(() => {
      resultObj = {};
      fileLoaderStub = sinon.createStubInstance(DefaultFileLoader);
      actionsManager.fileLoader = fileLoaderStub;
      fileLoaderStub.loadFiles.returns(['valid.js', 'invalid']);

      controllerLoaderStub = sinon.createStubInstance(DefaultControllerLoader);
      actionsManager.controllerLoader = controllerLoaderStub;
      controllerLoaderStub.loadController.withArgs('valid.js').returns(resultObj);
      controllerLoaderStub.loadController.returns(undefined);

      resultControllers = actionsManager.loadControllers();
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
      sinon.stub(actionsManager, 'loadControllers').returns({valid: {}});
    });

    it('should return true when has the controller', () => {
      expect(actionsManager.hasController('valid')).to.be.true;
    });

    it('should return false when given an invalid controller name', () => {
      expect(actionsManager.hasController('invalid')).to.be.false;
    });
  });

  describe('#getController', () => {
    let validControler;
    beforeEach(() => {
      validControler = {};
      sinon.stub(actionsManager, 'loadControllers').returns({ valid: validControler });
    });

    it('should return controller when provide a valid name', () => {
      expect(actionsManager.getController('valid')).to.be.eql(validControler);
    });

    it('should return undefined when provide an invalid name', () => {
      expect(actionsManager.getController('invalid')).to.be.undefined;
    })
  });

  describe('#getAction', () => {
    let validController, validAction;
    beforeEach(() => {
      validController = {};
      validAction = () => {};
      actionLoaderStub = sinon.createStubInstance(DefaultActionLoader);
      actionsManager.actionLoader = actionLoaderStub;
      actionLoaderStub.loadAction.withArgs(validController, 'validAction').returns(validAction);
      actionLoaderStub.loadAction.returns(undefined);

      sinon.stub(actionsManager, 'loadControllers').returns({ validController: validController });
    });

    it('should return an action when provide a valid action name', () => {
      expect(actionsManager.getAction('validController#validAction')).to.be.eql(validAction);
    });

    it('should return undefined when given a invalid action name', () => {
      expect(actionsManager.getAction('validController#invalidAction')).to.be.undefined;
    });

    it('should return undefined when given a invaild controller name', () => {
      expect(actionsManager.getAction('invalidController#validAction')).to.be.undefined;
    });

    it('should return undefined when given a empty handler name', () => {
      expect(actionsManager.getAction('')).to.be.undefined;
    });
  });
});
