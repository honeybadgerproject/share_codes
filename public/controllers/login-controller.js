var myLogin = angular.module('myApp');

myLogin.factory('UserFacebookID', function() {
    return {
        user: {} ,
        scopeState: 'index' ,
        logged: false
    };
});



myLogin.run(function ($rootScope, $state, $location, UserFacebookID ) {

  console.log("heloo wombath codes - inside LoginRun");

  $rootScope.$on('$stateChangeStart', function (event, toState, fromState, toParams) {
    //var requireLogin = toState.data.requireLogin;

  //  var requireLogin = toState.data.requireLogin && UserFacebookID.logged == 'false';


    console.log("step 1... about to authenticate - toState: " + toState.name +
    " - requireLogin: " + toState.data.requireLogin + " - logged: " + UserFacebookID.logged);

    // NOT authenticated
    if(toState.data.requireLogin == true && UserFacebookID.logged == false) {

      console.log("step 2... save current state " + toState.name);
      UserFacebookID.scopeState = toState.name;

      console.log("step 3... jump to login  " +   UserFacebookID.scopeState);
      $state.go("index");
      event.preventDefault();

      return;
    }

    // IS authenticated but not by login
    else if(UserFacebookID.logged) {
      console.log("step 1,2... save current state " + toState.name);
      UserFacebookID.scopeState = toState.name;

      console.log("step 1,3... jump to login  " +   UserFacebookID.scopeState);
      //$state.go("index");
      //event.preventDefault();
      return;
    }

    console.log(">>>> out of scope on");
  });
});

myLogin.service('loginModal', function ($modal, $rootScope) {

  console.log("heloo wombath codes - inside LoginService");

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

myLogin.controller('loginCtrl', function($scope, $http, $timeout, $state, $cacheFactory, Facebook, UserFacebookID) {

  console.log("heloo wombath codes - inside LoginCtrl");
    /******************** cache Id *************************/
    $scope.keys = [];
    $scope.cache = $cacheFactory('cacheId');

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

    var IntentLoginHTML = function(){
      console.log("step 4... starting the facebook login");
      Facebook.login(function(response) {
        if (response.status == 'connected') {
          $scope.logged = true;
          UserFacebookID.logged = true;

          $scope.me();

          console.log("step 5... jumping to the previus state");
          if(UserFacebookID.scopeState != "index") {
            $state.go(UserFacebookID.scopeState);
          }
        }

      });
    };

    ///// >>> emit
     var refreshProjectList = function(){
      console.log("/////>>>> refreshProjectList in emit");
      $scope.$emit('refreshProjectList', {});// res - your data
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

          console.log("step 5... jumping to the previus state");
          if(UserFacebookID.scopeState != "index") {
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

        console.log("step 6... adding the user info");
        $scope.$apply(function() {
          $scope.user = response;
          UserFacebookID.user = response;
          /* cache the user */
          console.log("cache >> step 1... adding the user info to cache");
          if (angular.isUndefined($scope.cache.get('userCached'))) {
            $scope.keys.push('userCached');
          }
          $scope.cache.put('userCached', angular.isUndefined(response) ? null : response);
          console.log("cache >> step 2  cached key: userCached , value: " + $scope.cache.get('userCached') );
            console.log($scope.cache.get('userCached'));
          //UserFacebookID.logged = true;
          console.log("1. send the current user to sever");
          console.log(UserFacebookID.user);
          refreshProjectList();

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
          $scope.cache.removeAll();
          UserFacebookID.logged = false;
          $state.go("index");
        //  event.preventDefault();
        });
      });
    };

    ///
    /// Taking approach of Events :D
    ///
    $scope.$on('Facebook:statusChange', function(ev, data) {
      console.log('Status: ', data);
      if (data.status == 'connected') {
        $scope.$apply(function() {
          $scope.salutation = true;
          $scope.byebye     = false;
          //$scope.user   = {};
          $scope.logged = true;
          //UserFacebookID.user = {};
          UserFacebookID.logged = true;
          refreshProjectList();

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
