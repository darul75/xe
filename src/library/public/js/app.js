(function (angular) {
angular.module('angular-library', ['ngRoute', 'libraryControllers', 'libraryServices', 'libraryDirectives', 'libraryTemplates'])
// base api URL
.constant('BASE_URL_BOOKS', 'http://henri-potier.xebia.fr/books')

.config(function() {})

.run(function() { });

})(angular);