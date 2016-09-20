'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validater = function () {
  function Validater() {
    _classCallCheck(this, Validater);
  }

  _createClass(Validater, null, [{
    key: 'isValidObj',
    value: function isValidObj(obj) {
      return obj !== undefined && obj !== null;
    }
  }, {
    key: 'isValidFun',
    value: function isValidFun(obj) {
      return typeof obj === 'function';
    }
  }, {
    key: 'isNotEmptyObj',
    value: function isNotEmptyObj(obj) {
      return Validater.isValidObj(obj) && Object.keys(obj).length > 0;
    }
  }, {
    key: 'isNotEmptyString',
    value: function isNotEmptyString(string) {
      return Validater.isValidObj(string) && string.length > 0;
    }
  }]);

  return Validater;
}();

exports.default = Validater;