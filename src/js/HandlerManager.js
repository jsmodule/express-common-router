import FileHelper from './utils/FileHelper';
import DefaultFileLoader from './loaders/DefaultFileLoader';
import DefaultActionLoader from './loaders/DefaultActionLoader';
import DefaultHandlerLoader from './loaders/DefaultHandlerLoader';
import { Validator, StringValidator } from 'common-basic-validator';

class HandlerManager {
  constructor(path) {
    this._path = path;
    this._fileLoader = new DefaultFileLoader();
    this._actionLoader = new DefaultActionLoader();
    this._handlerLoader = new DefaultHandlerLoader();
  }

  set path(path) { this._path = path; }
  get path() { return this._path; }

  set fileLoader(loader) { this._fileLoader = loader; }
  get fileLoader() { return this._fileLoader; }

  set handlerLoader(loader) { this._handlerLoader = loader; }
  get handlerLoader() { return this._handlerLoader; }

  set actionLoader(loader) { this._actionLoader = loader; }
  get actionLoader() { return this._actionLoader; }

  get handlers() {
    return this._handlers || this._loadHandlers();
  }

  getHandlerAction(actionPath) {
    if (StringValidator.isNotBlank(actionPath)) {
      let [ handlerName, actionName ] = this._resolveActionPath(actionPath);
      if (this._hasHandler(handlerName)) {
        return this.actionLoader.loadAction(this._getHandler(handlerName), actionName);
      }
    }
  }

  _loadHandlers() {
    this._handlers = {};
    this.fileLoader.loadFiles(this._path).forEach((file) => {
      let handler = this.handlerLoader.loadHandler(file);
      if (Validator.isAnyValidValue(handler)) {
        this._handlers[FileHelper.fileName(file)] = handler;
      }
    });
    return this._handlers;
  }

  _hasHandler(name) {
    return this.handlers.hasOwnProperty(name);
  }

  _getHandler(name) {
    return this.handlers[name];
  }

  _resolveActionPath(path) {
    return path.split('#');
  }
}

export default HandlerManager;
