import path from 'path';
import Validater from './Validater';
import DefaultFileLoader from './DefaultFileLoader';
import DefaultActionLoader from './DefaultActionLoader';
import DefaultControllerLoader from './DefaultControllerLoader';

class ActionManager {
  constructor() {
    this.fileLoaderVal = new DefaultFileLoader();
    this.actionLoaderVal = new DefaultActionLoader();
    this.controllerLoaderVal = new DefaultControllerLoader();
  }

  set controllerPath(path) {
    this.path = path;
  }

  set actionLoader(loader) {
    this.actionLoaderVal = loader;
  }

  set fileLoader(loader) {
    this.fileLoaderVal = loader;
  }

  set controllerLoader(loader) {
    this.controllerLoaderVal = loader;
  }

  get controllers() {
    return this.controllerList || this.loadControllers();
  }

  getAction(handlerName) {
    if (Validater.isNotEmptyString(handlerName)) {
      let controllerName = this.controllerName(handlerName);
      if (this.hasController(controllerName)) {
        return this.actionLoaderVal.loadAction(this.getController(controllerName), this.actionName(handlerName));
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
    this.fileLoaderVal.loadFiles(this.path).forEach((file) => {
      let controller = this.controllerLoaderVal.loadController(file);
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

export default ActionManager;
