var myLogin = angular.module('myApp');

myLogin.factory('UserFacebookID', function() {
    return {
        user: {} ,
        scopeState,
        logged: 'false'
    };
});



myLogin.run(function ($rootScope, $state, $location, UserFacebookID ) {

  $rootScope.$on('$stateChangeStart', function (event, toState, fromState, toParams) {
    //var requireLogin = toState.data.requireLogin;

    var requireLogin = toState.data !== 'undefined'
                        && toState.data.requireLogin
                        && !UserFacebookID.logged ;


    console.log("step 1... about to authenticate - toState: " + toState.name + " - fromState: " + fromState.name);

    // NOT authenticated
    if(requireLogin) {

      console.log("step 2... save current state ");
      UserFacebookID.scopeState = $state.current;

      console.log("step 3... jump to login");
      $state.go("login");
      event.preventDefault();

      return;

    }
  });
});

myLogin.service('loginModal', function ($modal, $rootScope) {

    function assignCurrentUser (user) {
      $rootScope.currentUser = user;
      return user;
    }

    return function() {
      var instance = $modal.open({
        templateUrl: 'views/loginModalTemplate.html',
        controller: 'LoginModalCtrl',
        controllerAs: 'LoginModalCtrl'
      })
      return instance.result.then(assignCurrentUser);
    };

    //-----------------

    this.open = function (size) {

        var modalInstance = $modal.open({
          url: '',
          templateUrl: 'views/login.html'
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
    };

});

myLogin.controller('loginCtrl', function($scope, $http, $timeout, $state, Facebook, UserFacebookID) {


    /******************** facebook login **************************/


    // Define user empty data :/
    $scope.user = {};

    // Defining user logged status
    $scope.logged = false;

    // And some fancy flags to display messages upon user status change
    $scope.byebye = false;
    $scope.salutation = false;

    ///
    /// Watch for Facebook to be ready.
    ///There's also the event that could be used
    ///

    $scope.$watch(
      function() {
         return Facebook.isReady();
       },
       function(newVal) {
         if (newVal)
           $scope.facebookReady = true;
       }
    );

    var userIsConnected = false;

    Facebook.getLoginStatus(function(response) {
      if (response.status == 'connected') {
        userIsConnected = true;
      }
    });

    ///
    /// IntentLogin
    ///
    $scope.IntentLogin = function() {
      if(!userIsConnected) {
         $scope.login();
       }
    };

    ///
    /// Login
    ///
    $scope.login = function() {

      console.log("step 4... starting the facebook login");
      Facebook.login(function(response) {
        if (response.status == 'connected') {
          $scope.logged = true;
          UserFacebookID.logged = true;
          $scope.me();
          console.log("step 6... jumping to the previus state");
          if(UserFacebookID.scopeState != "login") {
            $state.go(UserFacebookID.scopeState);
          }
        }

      });
    };

    ///
    /// me
    ///
    $scope.me = function() {
      Facebook.api('/me', function(response) {
        ///
        /// Using $scope.$apply since this happens outside angular framework.
        ///

        console.log("step 5... adding the user info");
        $scope.$apply(function() {
          $scope.user = response;
          UserFacebookID.user = response;
        });
      });
    };

    ///
    /// Logout
    ///
    $scope.logout = function() {
      Facebook.logout(function() {
        $scope.$apply(function() {
          $scope.user   = {};
          $scope.logged = false;
          UserFacebookID.user = {};
          UserFacebookID.logged = false;
        });
      });
    }

    ///
    /// Taking approach of Events :D
    ///
    $scope.$on('Facebook:statusChange', function(ev, data) {
      console.log('Status: ', data);
      if (data.status == 'connected') {
        $scope.$apply(function() {
          $scope.salutation = true;
          $scope.byebye     = false;
        });
      } else {
        $scope.$apply(function() {
          $scope.salutation = false;
          $scope.byebye     = true;

          // Dismiss byebye message after two seconds
          $timeout(function() {
            $scope.byebye = false;
          }, 2000)
        });
      }
    });



    /******************** end of facebook login **********************/


  /*  $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };*/


});