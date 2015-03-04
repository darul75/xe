(function (angular) {
var libraryControllers = angular.module('libraryControllers', []);

// Main app controller
libraryControllers.controller('MainCtrl', ['$scope', '$location', function(scope, location) {

  scope.isPurchaseView = function(){
    return location.path() === '/purchase';
  };

}]);
})(angular);