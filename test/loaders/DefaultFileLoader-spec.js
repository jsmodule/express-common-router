import Path from 'path';
import { expect } from 'chai';
import DefaultFileLoader from '../../src/js/loaders/DefaultFileLoader';

describe('DefaultFileLoader', () => {
  let fileLoader;

  beforeEach(() => {
    fileLoader = new DefaultFileLoader();
  });

  it('should return correct files when give a exist path', () => {
    let filePath = Path.join(__dirname, '../fixtures/');
    expect(fileLoader.loadFiles(filePath)).to.have.lengthOf(3);
  });
});
