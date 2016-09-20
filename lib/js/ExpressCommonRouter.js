'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _methods = require('methods');

var _methods2 = _interopRequireDefault(_methods);

var _ActionManager = require('./ActionManager');

var _ActionManager2 = _interopRequireDefault(_ActionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExpressCommonRouter = function () {
  function ExpressCommonRouter() {
    _classCallCheck(this, ExpressCommonRouter);

    this.router = new _express.Router();
    this.manager = new _ActionManager2.default();
  }

  _createClass(ExpressCommonRouter, [{
    key: 'routes',
    value: function routes() {
      return this.router;
    }
  }, {
    key: 'controllerPath',
    set: function set(path) {
      this.manager.path = path;
    }
  }, {
    key: 'actionManager',
    set: function set(manager) {
      this.manager = manager;
    }
  }, {
    key: 'actionLoader',
    set: function set(loader) {
      this.manager.actionLoaderVal = loader;
    }
  }, {
    key: 'fileLoader',
    set: function set(loader) {
      this.manager.fileLoaderVal = loader;
    }
  }, {
    key: 'controllerLoader',
    set: function set(loader) {
      this.manager.controllerLoaderVal = loader;
    }
  }]);

  return ExpressCommonRouter;
}();

_methods2.default.concat('use').forEach(function (method) {
  ExpressCommonRouter.prototype[method] = function (routePath, handlerName) {
    var action = this.manager.getAction(handlerName);
    if (typeof action === 'function') {
      this.router[method].call(this.router, routePath, action);
    } else {
      throw new TypeError('Can not find \'' + handlerName + '\' action.');
    }
  };
});

exports.default = ExpressCommonRouter;