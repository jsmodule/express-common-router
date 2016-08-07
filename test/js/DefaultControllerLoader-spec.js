import path from 'path';
import { expect } from 'chai';
import SimpleController from './fixtures/SimpleController';
import DefaultControllerLoader from '../../src/js/DefaultControllerLoader';

describe('DefaultControllerLoader', () => {
  let controllerLoader;

  beforeEach(() => {
    controllerLoader = new DefaultControllerLoader();
  });

  it('should return undefined when given a no export controller', () => {
    let controllerFile = path.join(__dirname, './fixtures/NoExportController.js');
    expect(controllerLoader.loadController(controllerFile)).to.be.undefined;
  });

  it('should return valid controller when given a exist controller', () => {
    let controllerFile = path.join(__dirname, './fixtures/SimpleController.js');
    expect(controllerLoader.loadController(controllerFile)).to.be.equal(SimpleController);
  });
});
