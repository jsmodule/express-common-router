# Express Common Router

This is a common router for express.

Current Status:

[![NPM version](https://img.shields.io/npm/v/express-common-router.svg)](https://npmjs.org/package/express-common-router)
[![NPM version](https://img.shields.io/npm/dm/express-common-router.svg)](https://npmjs.org/package/express-common-router)
[![Build Status](https://travis-ci.org/jsmodule/express-common-router.svg?branch=master)](https://travis-ci.org/jsmodule/express-common-router)

[![NPM](https://nodei.co/npm/express-common-router.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/express-common-router/)

## Installation

```
$ npm install express-common-router
```

## Usage

### First step:

Create two controllers:

* HelloController.js

```js
module.exports = function(req, res, next) {
  res.send("Hello Controller");
};
```

* TestController.js

```js
exports.index = function(req, res) {
  res.send("Hello Index");
};
exports.show = function(req, res) {
  res.send("Hello Show");
}
```

### Second step:

Create a routes config.

* routes.js

```js
const path = require('path');
const ExpressCommonRouter = require('express-common-router').ExpressCommonRouter;

const router = new ExpressCommonRouter();
router.controllerPath = path.join(__dirname, './js/controllers');

router.use('/hello', 'HelloController'); //Must use the same name with file name.
router.get('/test/index', 'TestController#index'); //Controller name and action name separated by '#'
router.get('/test/index', 'TestController#index'); //More method please refer to 'express'

module.exports = router.routes();
```

ES6 Style

```js
import path from 'path';
import { ExpressCommonRouter } from '../lib';

const router = new ExpressCommonRouter();
router.controllerPath = path.join(__dirname, './js/controllers');

router.use('/hello', 'HelloController');
router.get('/test/index', 'TestController#index');
router.get('/test/show', 'TestController#show');

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

### Set controller path

Calling `controllerPath` method for ExpressCommonRouter class.

```js

const router = new ExpressCommonRouter();
router.controllerPath = path.join(__dirname, './controllers');
```

### Set custom FileLoader.

* Create a custom FileLoader like this:

```js
class CustomFileLoader {
  loadFiles(controllerPath) {
    ...
  }
}
export default CustomFileLoader;
```

* Config CustomFileLoader into router config file.

```js
import { ExpressCommonRouter } from '../lib';
import CustomFileLoader from './CustomFileLoader';

const router = new ExpressCommonRouter();
router.fileLoader = new CustomFileLoader();
```

### Set custom ControllerLoader.

* Create a custom ControllerLoader like this:

```js
class CustomControllerLoader {
  loadController(controllerFile) {
    ...
  }
}
export default CustomControllerLoader;
```

* Config CustomControllerLoader into router config file.

```js
import { ExpressCommonRouter } from '../lib';
import CustomControllerLoader from './CustomControllerLoader';

const router = new ExpressCommonRouter();
router.controllerLoader = new CustomControllerLoader();
```

### Set custom ActionLoader.

* Create a custom ActionLoader like this:

```js
class CustomActionLoader {
  loadAction(controller, actionName) {
    ...
  }
}
export default CustomActionLoader;
```

* Config CustomActionLoader into router config file.

```js
import { ExpressCommonRouter } from '../lib';
import CustomActionLoader from './CustomActionLoader';

const router = new ExpressCommonRouter();
router.actionLoader = new CustomActionLoader();
```

### Set custom ActionsManager.

* Create a custom ActionsManager like this:

```js
class CustomActionManager {
  getAction(handlerName) {
    ...
  }
}
export default CustomActionManager;
```

* Config CustomActionsManager into router config file.

```js
import { ExpressCommonRouter } from '../lib';
import CustomActionManager from './CustomActionManager';

const router = new ExpressCommonRouter();
router.actionManager = new CustomActionManager();
```

### Config your routes.

This component support all methods which supported by `express`.

About the details of config route, please refer to here: [Express Router](http://www.expressjs.com.cn/guide/routing.html)
