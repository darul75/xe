(function (angular) {
var libraryControllers = angular.module('libraryControllers', []);

libraryControllers.controller('BooksCtrl', ['$scope', 'booksCommercialOffersFactory', function(scope, booksCommercialOffersFactory) {
  scope.basket = {};
  scope.basketIt = function(transaction) {
  	var book = transaction.book;
  	var add = transaction.type;
  	var basketItem = scope.basket[book.isbn];
  	if (!basketItem) {
  		scope.basket[book.isbn] = {book: book};
  	}
  	scope.basket[book.isbn].count = scope.basket[book.isbn].count + (add ? 1:-1);	  	
  };

  booksCommercialOffersFactory.query({isbns:'c8fabf68-8374-48fe-a7ea-a00ccd07afff,a460afed-e5e7-4e39-a39d-c885c05db861'}, function(data) {
		scope.books = data;
  });
}]);
})(angular);