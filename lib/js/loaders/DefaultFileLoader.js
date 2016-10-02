'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DefaultFileLoader = function () {
  function DefaultFileLoader() {
    _classCallCheck(this, DefaultFileLoader);
  }

  _createClass(DefaultFileLoader, [{
    key: 'loadFiles',
    value: function loadFiles(path) {
      return _fs2.default.readdirSync(path).map(function (file) {
        return _path2.default.format({ dir: path, base: file });
      });
    }
  }]);

  return DefaultFileLoader;
}();

exports.default = DefaultFileLoader;