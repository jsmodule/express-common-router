import Path from 'path';
import { expect } from 'chai';
import ObjectHandler from '../fixtures/ObjectHandler';
import FunctionHandler from '../fixtures/FunctionHandler';
import DefaultHandlerLoader from '../../src/js/loaders/DefaultHandlerLoader';

describe('DefaultHandlerLoader', () => {
  let handlerLoader;

  beforeEach(() => {
    handlerLoader = new DefaultHandlerLoader();
  });

  it('should return undefined when given a no export handler', () => {
    let handlerFile = Path.join(__dirname, '../fixtures/NoExportHandler.js');
    expect(handlerLoader.loadHandler(handlerFile)).to.be.undefined;
  });

  it('should return valid handler when given a exist handler', () => {
    let handlerFile = Path.join(__dirname, '../fixtures/ObjectHandler.js');
    expect(handlerLoader.loadHandler(handlerFile)).to.be.equal(ObjectHandler);
  });

  it('should return valid handler when given a function handler', () => {
    let handlerFile = Path.join(__dirname, '../fixtures/FunctionHandler.js');
    expect(handlerLoader.loadHandler(handlerFile)).to.be.equal(FunctionHandler);
  });
});
