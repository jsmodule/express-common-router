# Express Common Router

This is a common router for express.

Current Status:

[![NPM version](https://img.shields.io/npm/v/express-common-router.svg)](https://npmjs.org/package/express-common-router)
[![NPM version](https://img.shields.io/npm/dm/express-common-router.svg)](https://npmjs.org/package/express-common-router)
[![Build Status](https://travis-ci.org/jsmodule/express-common-router.svg?branch=master)](https://travis-ci.org/jsmodule/express-common-router)

[![NPM](https://nodei.co/npm/express-common-router.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/express-common-router/)

## Installation

```
$ npm|yarn install express-common-router
```

## Usage

### First step:

Create two handlers:

* Hello.js

```js
module.exports = function(req, res, next) {
  res.send("Hello World");
};
```

* Test.js

```js
exports.index = function(req, res) {
  res.send("Hello Index");
};
exports.show = function(req, res) {
  res.send("Hello Show");
}
```

* NotFound.js

```js
exports.index = function(req, res) {
  res.send("Not Found");
};
```

### Second step:

Create a routes config.

* routes.js

```js
const path = require('path');
const ExpressCommonRouter = require('express-common-router').default;

const handlerPath = path.join(__dirname, './js/handlers')
const router = new ExpressCommonRouter(handlerPath);

router.use('/hello', 'Hello'); //Must use the same name with file name.
router.get('/test/index', 'Test#index'); //Handler name and action name separated by '#'
router.get('/test/index', 'Test#index'); //More method please refer to 'express'
router.all('*', 'NotFound'); //More method please refer to 'express'

module.exports = router.routes();
```

ES6 Style

```js
import path from 'path';
import ExpressCommonRouter from 'express-common-router';

const router = new ExpressCommonRouter();
router.path = path.join(__dirname, './js/handlers');

router.use('/hello', 'Hello'); //Must use the same name with file name.
router.get('/test/index', 'Test#index'); //Handler name and action name separated by '#'
router.get('/test/index', 'Test#index'); //More method please refer to 'express'

module.exports = router.routes();
```

### Third step:

Using routes in server.js

```js
const express = require('express');
const routes = require('./routes');
const app = express();

app.use(routes);

app.listen(3000, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    return;
  }
});

```

## More Details

### How to set handler file path?

* Passing `path` as a parameter when create an instance of ExpressCommonRouter.

```js

const handlerPath = path.join(__dirname, './handlers');
const router = new ExpressCommonRouter(handlerPath);
```

* Calling `path` method for ExpressCommonRouter instance.

```js

const router = new ExpressCommonRouter();
router.path = path.join(__dirname, './handlers');
```

### Set custom HandlerManager.

* Create a custom HandlerManager like this:

```js
class CustomHandlerManager {
  getHandlerAction(actionPath) {
    ...
  }
}
export default CustomHandlerManager;
```

* Config CustomHandlerManager into router config file.

```js
import ExpressCommonRouter from 'express-common-router';
import CustomHandlerManager from './CustomHandlerManager';

const router = new ExpressCommonRouter();
router.manager.actionManager = new CustomHandlerManager();
```

### Set custom FileLoader.

* Create a custom FileLoader like this:

```js
class CustomFileLoader {
  loadFiles(handlerPath) {
    ...
  }
}
export default CustomFileLoader;
```

* Config CustomFileLoader into router config file.

```js
import ExpressCommonRouter from 'express-common-router';
import CustomFileLoader from './CustomFileLoader';

const router = new ExpressCommonRouter();
router.manager.fileLoader = new CustomFileLoader();
```

### Set custom HandlerLoader.

* Create a custom HandlerLoader like this:

```js
class CustomHandlerLoader {
  loadHandler(handlerFile) {
    ...
  }
}
export default CustomHandlerLoader;
```

* Config CustomHandlerLoader into router config file.

```js
import ExpressCommonRouter from 'express-common-router';
import CustomHandlerLoader from './CustomHandlerLoader';

const router = new ExpressCommonRouter();
router.manager.handlerLoader = new CustomHandlerLoader();
```

### Set custom ActionLoader.

* Create a custom ActionLoader like this:

```js
class CustomActionLoader {
  loadAction(handler, actionName) {
    ...
  }
}
export default CustomActionLoader;
```

* Config CustomActionLoader into router config file.

```js
import ExpressCommonRouter from 'express-common-router';
import CustomActionLoader from './CustomActionLoader';

const router = new ExpressCommonRouter();
router.manager.actionLoader = new CustomActionLoader();
```


### Config your routes.

This component support all methods which supported by `express`.

About the details of config route, please refer to here: [Express Router](http://www.expressjs.com.cn/guide/routing.html)

## License

express-common-router is released under the MIT license.
