(function (angular) {
var libraryServices = angular.module('libraryServices', ['ngResource']);

libraryServices.factory('booksFactory', ['$resource','BASE_URL_BOOKS',
  function(resource, BASE_URL_BOOKS){
    return resource(BASE_URL_BOOKS, {}, {
      query: {method:'GET', isArray:true}
    });
  }
]);
libraryServices.factory('booksCommercialOffersFactory', ['$resource','BASE_URL_BOOKS',
  function(resource, BASE_URL_BOOKS){
    return resource(BASE_URL_BOOKS+'/:isbns/commercialOffers', {isbns:'@id'}, {
      query: {method:'POST'}
    });
  }
]);

})(angular);