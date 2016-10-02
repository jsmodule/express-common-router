import { expect } from 'chai';
import DefaultActionLoader from '../../src/js/loaders/DefaultActionLoader';

describe('DefaultActionLoader', () => {
  let actionLoader, handler;

  beforeEach(() => {
    handler = {};
    actionLoader = new DefaultActionLoader();
  });

  it('should return handler when given a empty action name', () => {
    expect(actionLoader.loadAction(handler, '')).to.be.equal(handler);
  });

  it('should return undefined when given a invalid action name', () => {
    expect(actionLoader.loadAction(handler, 'invalid')).to.be.undefined;
  });

  it('should return action when given a valid action name', () => {
    handler['valid'] = () => {};
    expect(actionLoader.loadAction(handler, 'valid')).to.be.a('function');
  });
});
