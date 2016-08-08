import Validater from './Validater';

class DefaultControllerLoader {
  constructor() { }

  loadController(controllerFile) {
    let controller = require(controllerFile);
    if (Validater.isValidFun(controller) || Validater.isNotEmptyObj(controller)) {
      return controller;
    }
  }
}

export default DefaultControllerLoader;
