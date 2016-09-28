import { expect } from 'chai';
import Validater from '../../src/js/utils/Validater';

describe('Validater', () => {

  describe('#isValidObj', () => {
    it('should return false when given a null obj', () => {
      expect(Validater.isValidObj(null)).to.be.false;
    });

    it('should return false when given a undefined obj', () => {
      expect(Validater.isValidObj(undefined)).to.be.false;
    });

    it('should return true when given a valid obj', () => {
      expect(Validater.isValidObj('valid')).to.be.true;
    });
  });

  describe('#isValidFun', () => {
    it('should return false when given a null obj', () => {
      expect(Validater.isValidFun(null)).to.be.false;
    });

    it('should return false when given a undefined obj', () => {
      expect(Validater.isValidFun(undefined)).to.be.false;
    });

    it('should return true when given a valid fun', () => {
      expect(Validater.isValidFun(() => {})).to.be.true;
    });
  });

  describe('#isNotEmptyObj', () => {
    it('should return false when given a empty obj', () => {
      expect(Validater.isNotEmptyObj({})).to.be.false;
    });

    it('should return true when given a obj which have one property', () => {
      expect(Validater.isNotEmptyObj({a: 1})).to.be.true;
    });
  });

  describe('#isNotEmptyString', () => {
    it('should return false when given a empty string', () => {
      expect(Validater.isNotEmptyString('')).to.be.false;
    });

    it('should return true when given a valid string', () => {
      expect(Validater.isNotEmptyString('valid')).to.be.true;
    });
  });
});
