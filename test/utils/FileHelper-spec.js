import { expect } from 'chai';
import FileHelper from '../../src/js/utils/FileHelper';

describe('FileHelper', () => {

  describe('#fileName', () => {
    it('should return file name by file path', () => {
      expect(FileHelper.fileName('abc.js')).to.be.equal('abc');
    });
  });

});
