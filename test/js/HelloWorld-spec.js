import { expect } from 'chai';

import HelloWorld from '../../src/js/HelloWorld';

describe('HelloWorld', () => {
  let helloWorld;

  beforeEach(() => {
    helloWorld = new HelloWorld();
  });

  it('should return hello message', () => {
    expect(helloWorld.message('World')).to.be.equal('Hello World');
  });
});
