'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FileHelper = require('./utils/FileHelper');

var _FileHelper2 = _interopRequireDefault(_FileHelper);

var _DefaultFileLoader = require('./loaders/DefaultFileLoader');

var _DefaultFileLoader2 = _interopRequireDefault(_DefaultFileLoader);

var _DefaultActionLoader = require('./loaders/DefaultActionLoader');

var _DefaultActionLoader2 = _interopRequireDefault(_DefaultActionLoader);

var _DefaultHandlerLoader = require('./loaders/DefaultHandlerLoader');

var _DefaultHandlerLoader2 = _interopRequireDefault(_DefaultHandlerLoader);

var _commonBasicValidator = require('common-basic-validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HandlerManager = function () {
  function HandlerManager(path) {
    _classCallCheck(this, HandlerManager);

    this._path = path;
    this._fileLoader = new _DefaultFileLoader2.default();
    this._actionLoader = new _DefaultActionLoader2.default();
    this._handlerLoader = new _DefaultHandlerLoader2.default();
  }

  _createClass(HandlerManager, [{
    key: 'getHandlerAction',
    value: function getHandlerAction(actionPath) {
      if (_commonBasicValidator.StringValidator.isNotBlank(actionPath)) {
        var _resolveActionPath2 = this._resolveActionPath(actionPath);

        var _resolveActionPath3 = _slicedToArray(_resolveActionPath2, 2);

        var handlerName = _resolveActionPath3[0];
        var actionName = _resolveActionPath3[1];

        if (this._hasHandler(handlerName)) {
          return this.actionLoader.loadAction(this._getHandler(handlerName), actionName);
        }
      }
    }
  }, {
    key: '_loadHandlers',
    value: function _loadHandlers() {
      var _this = this;

      this._handlers = {};
      this.fileLoader.loadFiles(this._path).forEach(function (file) {
        var handler = _this.handlerLoader.loadHandler(file);
        if (_commonBasicValidator.Validator.isAnyValidValue(handler)) {
          _this._handlers[_FileHelper2.default.fileName(file)] = handler;
        }
      });
      return this._handlers;
    }
  }, {
    key: '_hasHandler',
    value: function _hasHandler(name) {
      return this.handlers.hasOwnProperty(name);
    }
  }, {
    key: '_getHandler',
    value: function _getHandler(name) {
      return this.handlers[name];
    }
  }, {
    key: '_resolveActionPath',
    value: function _resolveActionPath(path) {
      return path.split('#');
    }
  }, {
    key: 'path',
    set: function set(path) {
      this._path = path;
    },
    get: function get() {
      return this._path;
    }
  }, {
    key: 'fileLoader',
    set: function set(loader) {
      this._fileLoader = loader;
    },
    get: function get() {
      return this._fileLoader;
    }
  }, {
    key: 'handlerLoader',
    set: function set(loader) {
      this._handlerLoader = loader;
    },
    get: function get() {
      return this._handlerLoader;
    }
  }, {
    key: 'actionLoader',
    set: function set(loader) {
      this._actionLoader = loader;
    },
    get: function get() {
      return this._actionLoader;
    }
  }, {
    key: 'handlers',
    get: function get() {
      return this._handlers || this._loadHandlers();
    }
  }]);

  return HandlerManager;
}();

exports.default = HandlerManager;