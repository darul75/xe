(function (angular) {
  'use strict';

  angular.module('angular-library', ['ngRoute', 'libraryControllers', 'libraryServices', 'libraryDirectives'])
  .constant('BASE_URL_BOOKS', 'http://henri-potier.xebia.fr/books')
.config(function() {})
.run(function() {});
})(angular);