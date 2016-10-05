import { ObjectValidator, FunctionValidator } from 'common-basic-validator';

class DefaultHandlerLoader {
  constructor() { }

  loadHandler(handlerFile) {
    let handler = require(handlerFile);
    if (FunctionValidator.isFunction(handler) || ObjectValidator.hasAnyProperty(handler)) {
      return handler;
    }
  }
}

export default DefaultHandlerLoader;
