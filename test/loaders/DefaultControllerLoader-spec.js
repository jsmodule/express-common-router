import Path from 'path';
import { expect } from 'chai';
import SimpleController from '../fixtures/SimpleController';
import FunctionController from '../fixtures/FunctionController';
import DefaultControllerLoader from '../../src/js/loaders/DefaultControllerLoader';

describe('DefaultControllerLoader', () => {
  let controllerLoader;

  beforeEach(() => {
    controllerLoader = new DefaultControllerLoader();
  });

  it('should return undefined when given a no export controller', () => {
    let controllerFile = Path.join(__dirname, '../fixtures/NoExportController.js');
    expect(controllerLoader.loadController(controllerFile)).to.be.undefined;
  });

  it('should return valid controller when given a exist controller', () => {
    let controllerFile = Path.join(__dirname, '../fixtures/SimpleController.js');
    expect(controllerLoader.loadController(controllerFile)).to.be.equal(SimpleController);
  });

  it('should return valid controller when given a function controller', () => {
    let controllerFile = Path.join(__dirname, '../fixtures/FunctionController.js');
    expect(controllerLoader.loadController(controllerFile)).to.be.equal(FunctionController);
  });
});
