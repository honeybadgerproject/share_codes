;(function() {
"use strict";


angular.module("app.login" , [])

// disable spinner in loading-bar
.run(function($rootScope, $location, UserFacebookID) {

  // register listener to watch route changes
  $rootScope.$on( "$routeChangeStart", function(event, next) {

    var current = $location.path();
    console.log("step 1... about to authenticate - toState: " + current  + " logged: " + UserFacebookID.logged);

    if ( UserFacebookID.logged == false ) {
      // no logged user, we should be going to #login (current path equal to signin)
      if ( current == "/pages/signin" ) {
        // already going to #login, no redirect needed
      } else {
        // not going to #login, we should redirect now (current path different to signin)
        console.log("step 2... save current state " + current);
        UserFacebookID.scopeState = current;
        console.log("step 3... jump to login  " +   UserFacebookID.scopeState);
        $location.path( "/pages/signin" );
        event.preventDefault();
      }
    }

  });
})


// Root Controller
.controller("loginCtrl", ["$rootScope", "$scope", "$timeout", "$window", "Facebook", "UserFacebookID" ,
        function($rs, $scope, $timeout, $window, Facebook, UserFacebookID) {

  //'loginCtrl', function($scope, $http, $timeout, $state, $cookies, $cookieStore, $window, Facebook, UserFacebookID
  //"$cookies", "$cookieStore",

  console.log("heloo wombath codes - inside LoginCtrl");



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
          if(UserFacebookID.scopeState != "/pages/signin") {
            $location.path(UserFacebookID.scopeState);
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
          if(UserFacebookID.scopeState != "/pages/signin") {
            $location.path(UserFacebookID.scopeState);
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

          console.log("cookie >> step 1... adding the user info to cookie");
          // Put cookie
          //$cookieStore.put('userCached', response);
        /*  $cookies.userName =   UserFacebookID.user.name;
          $scope.platformCookie = $cookies.userName;
          $cookieStore.put('userCached', response);*/
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
          // Removing a cookie
          //$cookieStore.remove('myFavorite');
          UserFacebookID.logged = false;
          userIsConnected = false;
          $location.path("/pages/signin");
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



}])



// #end
})()
