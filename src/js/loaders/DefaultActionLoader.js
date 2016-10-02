import Validater from '../utils/Validater';

class DefaultActionLoader {
  constructor() { }

  loadAction(handler, actionName) {
    if (Validater.isNotEmptyString(actionName)) {
      if (this._isValidAction(handler, actionName)) {
        return handler[actionName];
      }
    } else {
      return handler;
    }
  }

  _isValidAction(handler, actionName) {
    return Validater.isValidObj(handler) && handler.hasOwnProperty(actionName);
  }
}

export default DefaultActionLoader;
