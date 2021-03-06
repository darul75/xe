describe('angular-library', function () {
  var testDirective,
  httpBackend,
  mockBooksOffersFactory,
  noop = angular.noop,
  scope,
  fixture = function fixture($compile, $rootScope, $timeout) {
    scope = $rootScope.$new();
    
    /**
     * Compiles markup and check total.
     * @param {string} markup Markup to compile
     * @param {value} total test
     */
    return function tester(markup, value) {

      httpBackend.whenGET("http://henri-potier.xebia.fr/books").respond([{"isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff","title": "Henri Potier à l'école des sorciers","price": 35,"cover": "http://henri-potier.xebia.fr/hp0.jpg"}]);

      var element = $compile(markup)(scope);
      scope.$digest();

      $timeout.flush(2000);      
               
      angular.element(document.body).append(element);

      // http mock
      httpBackend.flush();      

      // propagate click add button
      var event = document.createEvent("MouseEvent");
      event.initMouseEvent("click", true, true);
      angular.element(element[0].children[1]).find('button')[1].dispatchEvent(event);

      // check total
      var total = angular.element(element[0].children[2].children[0]).html();

      expect(total).toBe(value);

      return element;
    };
  },

  obj;  

  beforeEach(module('angular-library'));  

  beforeEach(inject(function ($injector, $httpBackend, _booksOffersFactory_) {
    httpBackend = $httpBackend;    
    testDirective = $injector.invoke(fixture);    
    booksOffersFactory = _booksOffersFactory_;    
  }));  
  
  // DIRECTIVE TESTING
  describe('books basket directive', function () {
    it('basket', function () {      
      testDirective('<books></books>', "€ 35.00");
    });    
  });

  // SERVICE TESTING
  describe('books services', function () {
    it('testing factory', function() {
      var offers = [
        {"type": "percentage", "value": 5},
        {"type": "minus", "value": 15},
        {"type": "slice", "sliceValue": 100, "value": 12}
      ];

      var books = [
        {
          "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
          "title": "Henri Potier à l'école des sorciers",
          "price": 35,
          "cover": "http://henri-potier.xebia.fr/hp0.jpg"
        },
        {
          "isbn": "a460afed-e5e7-4e39-a39d-c885c05db861",
          "title": "Henri Potier et la Chambre des secrets",
          "price": 30,
          "cover": "http://henri-potier.xebia.fr/hp1.jpg"
        }
      ];
      
      // minus
      expect(booksOffersFactory.computeTotalPrice(books, 65, offers)).toBe(50);
            
      // percentage
      offers[1].value = 0;
      expect(booksOffersFactory.computeTotalPrice(books, 65, offers)).toBe(62);
    });    
  });

});
