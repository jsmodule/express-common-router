import Validater from '../utils/Validater';

class DefaultActionLoader {
  constructor() { }

  loadAction(controller, actionName) {
    if (Validater.isNotEmptyString(actionName)) {
      if (this._isValidAction(controller, actionName)) {
        return controller[actionName];
      }
    } else {
      return controller;
    }
  }

  _isValidAction(controller, actionName) {
    return Validater.isValidObj(controller) && controller.hasOwnProperty(actionName);
  }
}

export default DefaultActionLoader;
