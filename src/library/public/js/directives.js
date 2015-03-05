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

	// compute total item price
	this.total = function(books){
		self.totalValue = 0;				

		angular.forEach(books, function(b){
			if (b.count){
				self.totalValue+= b.count * b.price;
			}
		});

		return self.totalValue;
	};

	// trigger purchase
 	this.purchase = function(transaction) {
  	self.items = transaction.items;    
    var isbns = ''
    angular.forEach(self.items, function(item){
      isbns += item.count > 0 ? item.isbn+',' : ''
    });
    // 1) fetch offers
    booksOffersFactory.resource.query({isbns:isbns}, function(data) {
    	// 2) compute new total
      var bill = booksOffersFactory.computeTotalPrice(self.items, self.totalValue, data.offers);
      // 3) emit result
      scope.$emit('bill', {oldTotal:self.totalValue, total:bill, books: self.items});
    });

    // redirect
    location.path('/purchase');
  };
	
}])
// book basket directive
.directive('books', [function() {

	// link function
	var linkFn = function(scope, element, attrs, basketCtrl){			
		basketCtrl.fetchBooks(function(data){
			scope.books = data;
		});

		scope.purchase = function() {		  	
			basketCtrl.purchase({items:scope.books});
		};

		scope.click = function(add, book) {
			basketCtrl.click(add, book);
		};

		scope.total = function() {
			return basketCtrl.total(scope.books);
		};

		scope.total = function() {
			return basketCtrl.total(scope.books);
		};

		scope.isTotalValue = function() {		  	
			return basketCtrl.totalValue;
		};
	};
	return {
		controller: 'BasketCtrl', // delegate business logic
		templateUrl: 'library/books.tmpl.html',
		restrict: 'E',
		scope: {
      'onpurchase': '&onPurchase'
    },
		link: linkFn
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