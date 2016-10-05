import { ObjectValidator, StringValidator } from 'common-basic-validator';

class DefaultActionLoader {
  constructor() { }

  loadAction(handler, actionName) {
    if (StringValidator.isNotBlank(actionName)) {
      if (ObjectValidator.hasProperty(handler, actionName)) {
        return handler[actionName];
      }
    } else {
      return handler;
    }
  }
}

export default DefaultActionLoader;
