import path from 'path';
import Validater from './Validater';
import DefaultFileLoader from './DefaultFileLoader';
import DefaultActionLoader from './DefaultActionLoader';
import DefaultControllerLoader from './DefaultControllerLoader';

class ActionsManager {
  constructor() {
    this.fLoader = new DefaultFileLoader();
    this.aLoader = new DefaultActionLoader();
    this.cLoader = new DefaultControllerLoader();
  }

  set controllerPath(path) {
    this.path = path;
  }

  set actionLoader(loader) {
    this.aLoader = loader;
  }

  set fileLoader(loader) {
    this.fLoader = loader;
  }

  set controllerLoader(loader) {
    this.cLoader = loader;
  }

  get controllers() {
    return this.controllerList || this.loadControllers();
  }

  getAction(handlerName) {
    if (Validater.isNotEmptyString(handlerName)) {
      let controllerName = this.controllerName(handlerName);
      if (this.hasController(controllerName)) {
        return this.aLoader.loadAction(this.getController(controllerName), this.actionName(handlerName));
      }
    }
  }

  hasController(name) {
    return this.controllers.hasOwnProperty(name);
  }

  getController(name) {
    return this.controllers[name];
  }

  loadControllers() {
    this.controllerList = {};
    this.fLoader.loadFiles(this.path).forEach((file) => {
      let controller = this.cLoader.loadController(file);
      if (Validater.isValidObj(controller)) {
        this.controllerList[this.fileName(file)] = controller;
      }
    });
    return this.controllerList;
  }

  fileName(file) {
    return path.basename(file, path.extname(file));
  }

  controllerName(name) {
    return name.split('#')[0];
  }

  actionName(name) {
    return name.split('#')[1];
  }
}

export default ActionsManager;
