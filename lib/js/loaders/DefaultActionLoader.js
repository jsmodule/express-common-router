'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Validater = require('../utils/Validater');

var _Validater2 = _interopRequireDefault(_Validater);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DefaultActionLoader = function () {
  function DefaultActionLoader() {
    _classCallCheck(this, DefaultActionLoader);
  }

  _createClass(DefaultActionLoader, [{
    key: 'loadAction',
    value: function loadAction(handler, actionName) {
      if (_Validater2.default.isNotEmptyString(actionName)) {
        if (this._isValidAction(handler, actionName)) {
          return handler[actionName];
        }
      } else {
        return handler;
      }
    }
  }, {
    key: '_isValidAction',
    value: function _isValidAction(handler, actionName) {
      return _Validater2.default.isValidObj(handler) && handler.hasOwnProperty(actionName);
    }
  }]);

  return DefaultActionLoader;
}();

exports.default = DefaultActionLoader;