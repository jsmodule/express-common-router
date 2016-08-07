import { expect } from 'chai';
import DefaultActionLoader from '../../src/js/DefaultActionLoader';

describe('DefaultActionLoader', () => {
  let actionLoader, controller;

  beforeEach(() => {
    controller = {};
    actionLoader = new DefaultActionLoader();
  });

  it('should return controller when given a empty action name', () => {
    expect(actionLoader.loadAction(controller, '')).to.be.equal(controller);
  });

  it('should return undefined when given a invalid action name', () => {
    expect(actionLoader.loadAction(controller, 'invalid')).to.be.undefined;
  });

  it('should return action when given a valid action name', () => {
    controller['valid'] = () => {};
    expect(actionLoader.loadAction(controller, 'valid')).to.be.a('function');
  });
});
