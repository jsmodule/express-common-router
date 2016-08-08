'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Validater = require('./Validater');

var _Validater2 = _interopRequireDefault(_Validater);

var _DefaultFileLoader = require('./DefaultFileLoader');

var _DefaultFileLoader2 = _interopRequireDefault(_DefaultFileLoader);

var _DefaultActionLoader = require('./DefaultActionLoader');

var _DefaultActionLoader2 = _interopRequireDefault(_DefaultActionLoader);

var _DefaultControllerLoader = require('./DefaultControllerLoader');

var _DefaultControllerLoader2 = _interopRequireDefault(_DefaultControllerLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ActionManager = function () {
  function ActionManager() {
    _classCallCheck(this, ActionManager);

    this.fileLoaderVal = new _DefaultFileLoader2.default();
    this.actionLoaderVal = new _DefaultActionLoader2.default();
    this.controllerLoaderVal = new _DefaultControllerLoader2.default();
  }

  _createClass(ActionManager, [{
    key: 'getAction',
    value: function getAction(handlerName) {
      if (_Validater2.default.isNotEmptyString(handlerName)) {
        var controllerName = this.controllerName(handlerName);
        if (this.hasController(controllerName)) {
          return this.actionLoaderVal.loadAction(this.getController(controllerName), this.actionName(handlerName));
        }
      }
    }
  }, {
    key: 'hasController',
    value: function hasController(name) {
      return this.controllers.hasOwnProperty(name);
    }
  }, {
    key: 'getController',
    value: function getController(name) {
      return this.controllers[name];
    }
  }, {
    key: 'loadControllers',
    value: function loadControllers() {
      var _this = this;

      this.controllerList = {};
      this.fileLoaderVal.loadFiles(this.path).forEach(function (file) {
        var controller = _this.controllerLoaderVal.loadController(file);
        if (_Validater2.default.isValidObj(controller)) {
          _this.controllerList[_this.fileName(file)] = controller;
        }
      });
      return this.controllerList;
    }
  }, {
    key: 'fileName',
    value: function fileName(file) {
      return _path2.default.basename(file, _path2.default.extname(file));
    }
  }, {
    key: 'controllerName',
    value: function controllerName(name) {
      return name.split('#')[0];
    }
  }, {
    key: 'actionName',
    value: function actionName(name) {
      return name.split('#')[1];
    }
  }, {
    key: 'controllerPath',
    set: function set(path) {
      this.path = path;
    }
  }, {
    key: 'actionLoader',
    set: function set(loader) {
      this.actionLoaderVal = loader;
    }
  }, {
    key: 'fileLoader',
    set: function set(loader) {
      this.fileLoaderVal = loader;
    }
  }, {
    key: 'controllerLoader',
    set: function set(loader) {
      this.controllerLoaderVal = loader;
    }
  }, {
    key: 'controllers',
    get: function get() {
      return this.controllerList || this.loadControllers();
    }
  }]);

  return ActionManager;
}();

exports.default = ActionManager;