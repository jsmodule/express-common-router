'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _commonBasicValidator = require('common-basic-validator');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DefaultActionLoader = function () {
  function DefaultActionLoader() {
    _classCallCheck(this, DefaultActionLoader);
  }

  _createClass(DefaultActionLoader, [{
    key: 'loadAction',
    value: function loadAction(handler, actionName) {
      if (_commonBasicValidator.StringValidator.isNotBlank(actionName)) {
        if (_commonBasicValidator.ObjectValidator.hasProperty(handler, actionName)) {
          return handler[actionName];
        }
      } else {
        return handler;
      }
    }
  }]);

  return DefaultActionLoader;
}();

exports.default = DefaultActionLoader;