var myApp = angular.module('myApp',['ui.router', 'facebook']);

myApp.config(function($stateProvider, $urlRouterProvider, FacebookProvider) {

  var myAppId = '901124496607649';

  // You can set appId with setApp method
  //FacebookProvider.setAppId('myAppId');

  /**
    * After setting appId you need to initialize the module.
    * You can pass the appId on the init method as a shortcut too.
  */
  FacebookProvider.init(myAppId);

  //$urlRouterProvider.otherwise('/index');

  $stateProvider.state("index", {
    url: '',
    templateUrl: 'views/login.html'
  });
  $stateProvider.state("search", {
    url: '/search',
    templateUrl: 'views/search.html'
  });
  $stateProvider.state("projects", {
    url: '/projects',
    templateUrl: 'views/projects.html'
  });
  $stateProvider.state("newproject", {
    url: '/new',
    templateUrl: 'views/newproject.html'
  });
  $stateProvider.state("saveproject", {
    url: '/update',
    templateUrl: 'views/saveproject.html'
  });


});

myApp.controller('AppCtrl', function($scope, $http, $timeout, Facebook) {

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
      Facebook.login(function(response) {
        if (response.status == 'connected') {
          $scope.logged = true;
          $scope.me();
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
        $scope.$apply(function() {
          $scope.user = response;
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

    console.log("heloo wombath codes");

    var refresh = function() {
      $http.get('/projectlist').success(function(response) {
        console.log("refresh");
        $scope.projectlist = response;
        $scope.project = "";
      });
    };

    refresh();

    $scope.addnewproject = function(newproject) {
      console.log(newproject);
      console.log($scope.project);
      $http.post('/projectlist', newproject).success(function(response) {
        console.log(response);
        refresh();
      });
    };

    $scope.remove = function(id) {
      console.log(id);
      $http.delete('/projectlist/' + id).success(function(response) {
        refresh();
      });
    };

    $scope.edit = function(id) {

      console.log(id);
      console.log("into edit");
      $http.get('/projectlist/' + id).success(function(response) {
        $scope.project = response;
      });
    };

    $scope.update = function() {
      console.log("add this edit project");
      console.log($scope.project);
      console.log("end add this edit project");
      console.log($scope.project._id);
      $http.put('/projectlist/' + $scope.project._id, $scope.project).success(function(response) {
        refresh();
      });
    };

    /* find the word in the database */

    $scope.search = function() {

      console.log($scope.search.text_search);
      $scope.findResults = new Array();
      var findRes = new Array();
        console.log("antes de if: " + $scope.search.text_search);
      if($scope.search.text_search)
      {
        $http.get('/search/' + $scope.search.text_search, $scope.search).success(function(response) {
          findRes = response;
          console.log("inicio findRes: ");
          console.log(findRes);
          console.log("fin findRes");

          ////--------------------------------------
          var indexF = 0;
          var str = new String();
          var text = $scope.search.text_search;
          for (i = 0; i < findRes.length; i++) {
            var tempFind = findRes[i].project_overview;
            console.log("primer for: " + tempFind);
            if(tempFind)
            {
              var n = tempFind.search(text);
              console.log("number: " + n);
              if(n >= 0) {
                $scope.findResults[indexF] = tempFind;
                indexF++;
              }
            }

          }
        });
      }
    };


});
