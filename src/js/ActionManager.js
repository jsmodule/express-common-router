import Validater from './utils/Validater';
import FileHelper from './utils/FileHelper';
import DefaultFileLoader from './loaders/DefaultFileLoader';
import DefaultActionLoader from './loaders/DefaultActionLoader';
import DefaultControllerLoader from './loaders/DefaultControllerLoader';

class ActionManager {
  constructor(path) {
    this._path = path;
    this._fileLoader = new DefaultFileLoader();
    this._actionLoader = new DefaultActionLoader();
    this._controllerLoader = new DefaultControllerLoader();
  }

  set path(path) { this._path = path; }
  get path() { return this._path; }

  set actionLoader(loader) { this._actionLoader = loader; }
  get actionLoader() { return this._actionLoader; }

  set fileLoader(loader) { this._fileLoader = loader; }
  get fileLoader() { return this._fileLoader; }

  set controllerLoader(loader) { this._controllerLoader = loader; }
  get controllerLoader() { return this._controllerLoader; }

  get controllers() {
    return this._controllers || this._loadControllers();
  }

  getAction(handlerName) {
    if (Validater.isNotEmptyString(handlerName)) {
      let [ controllerName, actionName ] = this._splitHandlerName(handlerName);
      if (this._hasController(controllerName)) {
        return this.actionLoader.loadAction(this._getController(controllerName), actionName);
      }
    }
  }

  _hasController(name) {
    return this.controllers.hasOwnProperty(name);
  }

  _getController(name) {
    return this.controllers[name];
  }

  _loadControllers() {
    this._controllers = {};
    this.fileLoader.loadFiles(this._path).forEach((file) => {
      let controller = this.controllerLoader.loadController(file);
      if (Validater.isValidObj(controller)) {
        this._controllers[FileHelper.fileName(file)] = controller;
      }
    });
    return this._controllers;
  }

  _splitHandlerName(name) {
    return name.split('#');
  }
}

export default ActionManager;
