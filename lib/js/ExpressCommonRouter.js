'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _methods = require('methods');

var _methods2 = _interopRequireDefault(_methods);

var _Validater = require('./utils/Validater');

var _Validater2 = _interopRequireDefault(_Validater);

var _HandlerManager = require('./HandlerManager');

var _HandlerManager2 = _interopRequireDefault(_HandlerManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExpressCommonRouter = function () {
  function ExpressCommonRouter(path) {
    _classCallCheck(this, ExpressCommonRouter);

    this._router = new _express.Router();
    this._manager = new _HandlerManager2.default(path);
  }

  _createClass(ExpressCommonRouter, [{
    key: 'routes',
    value: function routes() {
      return this._router;
    }
  }, {
    key: '_bindMethodWithAction',
    value: function _bindMethodWithAction(method, routePath, actionPath) {
      var action = this.manager.getHandlerAction(actionPath);
      if (_Validater2.default.isValidFun(action)) {
        this._router[method].call(this._router, routePath, action);
      } else {
        throw new TypeError('Can not find \'' + actionPath + '\' action.');
      }
    }
  }, {
    key: 'path',
    set: function set(path) {
      this.manager.path = path;
    }
  }, {
    key: 'manager',
    set: function set(manager) {
      this._manager = manager;
    },
    get: function get() {
      return this._manager;
    }
  }]);

  return ExpressCommonRouter;
}();

_methods2.default.concat('use').forEach(function (method) {
  ExpressCommonRouter.prototype[method] = function (routePath, handlerPath) {
    this._bindMethodWithAction(method, routePath, handlerPath);
  };
});

exports.default = ExpressCommonRouter;