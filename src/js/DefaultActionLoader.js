import Validater from './Validater';

class DefaultActionLoader {
  constructor() { }

  loadAction(controller, actionName) {
    if (Validater.isNotEmptyString(actionName)) {
      if (this.isValidAction(controller, actionName)) {
        return controller[actionName];
      }
    } else {
      return controller;
    }
  }

  isValidAction(controller, actionName) {
    return Validater.isValidObj(controller) && controller.hasOwnProperty(actionName);
  }
}

export default DefaultActionLoader;
