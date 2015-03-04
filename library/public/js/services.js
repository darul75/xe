(function (angular) {
var libraryServices = angular.module('libraryServices', ['ngResource']);

// books resource
libraryServices.factory('booksFactory', ['$resource','BASE_URL_BOOKS',
  function(resource, BASE_URL_BOOKS){
    return resource(BASE_URL_BOOKS, {}, {
      query: {method:'GET', isArray:true}
    });
  }
]);

// books commercial resource + total computing service
libraryServices.factory('booksOffersFactory', ['$resource','BASE_URL_BOOKS',
  function(resource, BASE_URL_BOOKS){    
    return {
      resource: resource(BASE_URL_BOOKS+'/:isbns/commercialOffers', {isbns:'@id'}, {query: {method:'GET'} }),
      computeTotalPrice: function(books, total, offers) {
        // {"type": "percentage", "value": 5},
        // {"type": "minus", "value": 15},
        // {"type": "slice", "sliceValue": 100, "value": 12}
        var newTotal = total;
        var tmpTotal = total;
        angular.forEach(offers, function(offer){
          switch (offer.type) {
            case "percentage":
              tmpTotal = newTotal - Math.round(total*offer.value/100);
              newTotal = tmpTotal > newTotal ? newTotal : tmpTotal;
            break;
            case "minus":
              tmpTotal = total-offer.value;
              newTotal = tmpTotal > newTotal ? newTotal : tmpTotal;
            break;
            case "slice":
              tmpTotal = total - Math.floor(total/offer.sliceValue)*offer.value;
              newTotal = tmpTotal > newTotal ? newTotal : tmpTotal;
            break;
          }          
        });        
        return newTotal;
      }      
    };
  }
]);

})(angular);