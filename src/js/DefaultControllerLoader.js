import Validater from './Validater';

class DefaultControllerLoader {
  constructor() { }

  loadController(controllerFile) {
    let controller = require(controllerFile);
    if (Validater.isNotEmptyObj(controller)) {
      return controller;
    }
  }
}

export default DefaultControllerLoader;
