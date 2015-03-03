(function (angular) {
var libraryDirectives = angular.module('libraryDirectives', []);
libraryDirectives.directive('books', ['booksFactory', function(booksFactory) {
	return {
		template: '<ul>'+
			'<li ng-repeat="b in books">'+
				'{{b.title}}'+
				'<div class="button" ng-click="click(1, b)">-</div>'+
				'<div class="button" ng-click="click(0, b)">+</div>'+
			'</li>'+
			'</ul>',
		restrict: 'E',		
		scope: {
      'onclick': '&onClick'
    },
		link: function(scope, element, attrs) {
			booksFactory.query(function(data) {
				scope.books = data;
		  });		  

		  scope.click = function(add, book) {
		  	scope.onclick({transaction: {type:add, book:book}});
		  };
		}
	};
}]);
})(angular);