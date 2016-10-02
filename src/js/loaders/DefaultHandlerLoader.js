import Validater from '../utils/Validater';

class DefaultHandlerLoader {
  constructor() { }

  loadHandler(handlerFile) {
    let handler = require(handlerFile);
    if (Validater.isValidFun(handler) || Validater.isNotEmptyObj(handler)) {
      return handler;
    }
  }
}

export default DefaultHandlerLoader;
