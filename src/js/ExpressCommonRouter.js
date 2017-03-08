import { Router } from 'express';
import methods from 'methods';
import HandlerManager from './HandlerManager';
import { FunctionValidator } from 'common-basic-validator';

class ExpressCommonRouter {
  constructor(path) {
    this._router = new Router();
    this._manager = new HandlerManager(path);
  }

  set path(path) { this.manager.path = path; }

  set manager(manager) { this._manager = manager; }
  get manager() { return this._manager; }

  routes() {
    return this._router;
  }

  _bindMethodWithAction(method, routePath, actionPath) {
    let action = this.manager.getHandlerAction(actionPath);
    if (FunctionValidator.isFunction(action)) {
      this._router[method].call(this._router, routePath, action);
    } else {
      throw new TypeError('Can not find \'' + actionPath + '\' action.');
    }
  }
}

methods.concat('all', 'use').forEach((method) => {
  ExpressCommonRouter.prototype[method] = function(routePath, handlerPath) {
    this._bindMethodWithAction(method, routePath, handlerPath);
  };
});

export default ExpressCommonRouter;
