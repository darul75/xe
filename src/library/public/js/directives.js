(function (angular) {
angular.module('libraryDirectives', [])

// basket directive ctrl
.controller('BasketCtrl', ['$scope','$location', 'booksFactory', 'booksOffersFactory',	
	function(scope, location, booksFactory, booksOffersFactory) {

	var service = booksOffersFactory;
	var self = this;	

	// fetch by api call
	this.fetchBooks = function(cb) {		
		booksFactory.query(cb);
	};

	this.fetchBooks(function(data){
		self.books = data;
	});					  	

	// handle item click add or remove
	this.click = function(add, book){
		if (!book.count){
			book.count = 0;
		}		  	
		book.count += add ? 1 : -1;
		if (book.count < 0){
			book.count = 0;
		}		  	
	};

	this.isTotalValue = function() {		  	
		return self.totalValue;
	};

	// compute total item price
	this.total = function(){
		self.totalValue = 0;				

		angular.forEach(self.books, function(b){
			if (b.count){
				self.totalValue+= b.count * b.price;
			}
		});

		return self.totalValue;
	};

	// trigger purchase
 	this.purchase = function() {
  	var items = self.books;    
    var isbns = '';
    angular.forEach(items, function(item){
      isbns += item.count > 0 ? item.isbn+',' : ''
    });
    // 1) fetch offers
    booksOffersFactory.resource.query({isbns:isbns}, function(data) {
    	// 2) compute new total
      var bill = booksOffersFactory.computeTotalPrice(items, self.totalValue, data.offers);
      // 3) emit result
      scope.$emit('bill', {oldTotal:self.totalValue, total:bill, books: items});
    });

    // redirect
    location.path('/purchase');
  };
	
}])
// book basket directive
.directive('books', [function() {	
	return {
		controller: 'BasketCtrl', // delegate business logic
		controllerAs: 'ctrl',
		templateUrl: 'library/books.tmpl.html',
		restrict: 'E',
		scope: {
      'onpurchase': '&onPurchase'
    }
	};
}])
// purchase directive
.directive('purchase', ['$location', function(location) {
	return {		
		templateUrl:'library/purchase.tmpl.html',
		restrict: 'E',		
		link: function(scope, element, attrs){			
			scope.cancel = function() {
				location.path('/');
			};

			// catch event for billing display
			scope.$on('bill', function(event, data) { 
				scope.transaction = data;
			});			
		}
	};
}])
})(angular);