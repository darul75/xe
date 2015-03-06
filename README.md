# xe

## Mower exercice

Made with NodeJS and using Mocha testing framework.

Test input data are of 2 types:
- file, example : https://github.com/darul75/xe/blob/master/test/mower.txt
- string, example : https://github.com/darul75/xe/blob/master/test/main.js#L25

### Install
```bash
$ npm install -g mocha
```

### Play test
```bash
$ mocha test/mower/main.js
```

### API Documentation
http://darul75.github.io/xe/

## Hero Book exercice

Made with AngularJS framework and using Karma testing framework

Not using any router for this simple demo.
* 2 controllers
  * main one for application
  * one dedicated to basket directive
* 2 directives
  * one for basket
  * one for billing
* 2 factories
  * books: retrieve booking list
  * books commercial offers: retrieve offers + compute reduction

### Install
```bash
$ npm install
$ bower install
```

### Play
http://darul75.github.io/xe/library/public/

### Play test
```bash
$ karma start test\library\conf.js
```
