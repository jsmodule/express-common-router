import { Router } from 'express';
import methods from 'methods';
import ActionsManager from './ActionsManager';

class ExpressCommonRouter {
  constructor() {
    this.router = new Router();
    this.manager = new ActionsManager();
  }

  set controllerPath(path) {
    this.manager.path = path;
  }

  set actionsManager(manager) {
    this.manager = manager;
  }

  set actionLoader(loader) {
    this.manager.actionLoaderVal = loader;
  }

  set fileLoader(loader) {
    this.manager.fileLoaderVal = loader;
  }

  set controllerLoader(loader) {
    this.manager.controllerLoaderVal = loader;
  }

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
