
angular.module('myApp')
       .constant('clientTokenPath', './client-token')
       .controller('checkout', function($scope, $http, $braintree) {

         $scope.dropinOptions = {
           //console.log("droping...");
           onPaymentMethodReceived: function(payload) {
             console.log(payload); // yay

           }
         };

         $scope.paymethod = function() {
           console.log("droping like a payment method...");

           $http.get('/client_token').success(function(response) {
             $scope.paybrain = response;
             console.log("response... client token");
             console.log($scope.paybrain);
             console.log($scope.paybrain.success);
           });

           console.log("change requests!");

           $http.post('/buy-something').success(function(response) {
             $scope.paybrain = response;
             console.log("response... buy somehting");
             console.log($scope.paybrain);
             console.log($scope.paybrain.success);
           });
         };

       });


/*var myLogin = angular.module('myApp').constant('clientTokenPath', './client-token');


myLogin.controller('braintreeCtrl', function($scope, $http, $braintree) {*/

/*  $scope.dropinOptions = {
    console.log("droping like a bitch");
    onPaymentMethodReceived: function(payload) {
      console.log(payload); // yay
    }
  };*/

  //$scope.paymethod = function() {
    //action="/buy-something" method="post"




    /*$http.post('/buy-something').success(function(response) {
      $scope.paybrain = response;
      console.log("response...");
      console.log($scope.paybrain);
      console.log($scope.paybrain.success);
    });*/


//  };

//});
