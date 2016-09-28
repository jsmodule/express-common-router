import { Router } from 'express';
import methods from 'methods';
import ActionManager from './ActionManager';

class ExpressCommonRouter {
  constructor(path) {
    this.router = new Router();
    this.manager = new ActionManager(path);
  }

  set controllerPath(path) { this.manager.path = path; }

  set actionManager(manager) { this.manager = manager; }
  get actionManager() { this.manager; }

  routes() {
    return this.router;
  }
}

methods.concat('use').forEach((method) => {
  ExpressCommonRouter.prototype[method] = function(routePath, handlerName) {
    let action = this.manager.getAction(handlerName);
    if (typeof action === 'function') {
      this.router[method].call(this.router, routePath, action);
    } else {
      throw new TypeError('Can not find \'' + handlerName + '\' action.');
    }
  };
});

export default ExpressCommonRouter;
