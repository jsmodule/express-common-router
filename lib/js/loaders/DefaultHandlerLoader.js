'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _commonBasicValidator = require('common-basic-validator');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DefaultHandlerLoader = function () {
  function DefaultHandlerLoader() {
    _classCallCheck(this, DefaultHandlerLoader);
  }

  _createClass(DefaultHandlerLoader, [{
    key: 'loadHandler',
    value: function loadHandler(handlerFile) {
      var handler = require(handlerFile);
      if (_commonBasicValidator.FunctionValidator.isFunction(handler) || _commonBasicValidator.ObjectValidator.hasAnyProperty(handler)) {
        return handler;
      }
    }
  }]);

  return DefaultHandlerLoader;
}();

exports.default = DefaultHandlerLoader;