(function(angular) {
  angular.module('libraryTemplates', [])
  .run(['$templateCache', function (templateCache) {
    // book basket template
    templateCache.put('library/books.tmpl.html',  
      '<h1>Librhero</h1>'+
      '<ul><li ng-repeat="b in books" ng-class="{\'active\':b.count > 0}">'+
        '<div class="right">'+
          '<button ng-click="click(0, b)">-</button>'+
          '<button ng-click="click(1, b)">+</button>'+
          '<div class="count">{{b.count > 0 && "" || b.count}}</div>'+
        '</div>'+
        '<div class="left">'+
          '<img ng-src="{{b.cover}}" height="80px" />'+
          '{{b.title}}'+
          '<span>{{b.price}}€</span>'+
        '</div>'+
      '</li>'+
      '</ul>'+
      '<div class="total">'+    
        'Total: <span>{{total() | currency: "€ "}}</span>'+
      '</div>'+
      '<button ng-click="purchase()" ng-show="isTotalValue()">Acheter</div>');
    // purchase command template
    templateCache.put('library/purchase.tmpl.html',
      '<h1>Bravo, une réduction vous est offerte</h1>'+
      '<ul><li class="bill" ng-repeat="b in books" ng-class="{\'active\':b.count > 0}">'+
        '<div class="right">'+          
          '<div class="count">{{b.count > 0 && "" || b.count}}</div>'+
        '</div>'+
        '<div class="left">'+
          '<img ng-src="{{b.cover}}" height="50px" />'+
          '{{b.title}}'+
          '<span>{{b.price}}€</span>'+
        '</div>'+
      '</li>'+
      '<div class="total">'+    
        'Ancien Total: <span>{{total | currency: "€ "}}</span></br>'+
        'Total avec réduction: <span>{{bill | currency: "€ "}}</span>'+
      '</div>'+
      '<button ng-click="confirm()">Confirmer</div>'+
      '<button ng-click="cancel()">Annuler</div>');
  }]);

})(angular);
