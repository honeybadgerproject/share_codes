var myApp = angular.module('myApp',['ui.router', 'facebook', 'braintree-angular', 'ct.ui.router.extras', 'ui.bootstrap']);

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

  /* home */
  $stateProvider.state("home", {
    url: '',
    templateUrl: 'views/home.html' ,
    data: {
      requireLogin: false
    }
  });
  /* login */
  $stateProvider.state("login", {
    url: 'login',
    templateUrl: 'views/login.html' ,
    data: {
      requireLogin: false
    }
  });
  /* search */
  $stateProvider.state("search", {
    url: '/search',
    templateUrl: 'views/search.html' ,
    data: {
      requireLogin: false
    }
  });
  /* project */
  $stateProvider.state("projects", {
    url: '/projects',
    templateUrl: 'views/projects.html' ,
    data: {
      requireLogin: true
    }
  });
  /* add new project */
  $stateProvider.state("newproject", {
    url: '/new',
    templateUrl: 'views/newproject.html' ,
    data: {
      requireLogin: false
    }
  });
  /* edit and save new project */
  $stateProvider.state("saveproject", {
    url: '/update',
    templateUrl: 'views/saveproject.html' ,
    data: {
      requireLogin: false
    }
  });
  /* jump to hacking zone */
  $stateProvider.state("hackingzone", {
    url: '/hackingzone',
    templateUrl: 'views/hackingzone.html' ,
    data: {
      requireLogin: false
    }
  });
  /* jump to preview the project */
  $stateProvider.state("preview", {
    url: '/preview',
    templateUrl: 'views/preview.html' ,
    data: {
      requireLogin: false
    }
  });
  /* pay the code */
  $stateProvider.state("pay", {
    url: '/pay',
    templateUrl: 'views/pay.html' ,
    data: {
      requireLogin: false
    }
  });

  // Send to home if the URL was not found
  $urlRouterProvider.otherwise("/home");

});




myApp.controller('AppCtrl', function($scope, $http, $timeout, Facebook) {

    console.log("heloo wombath codes");

    $scope.changeStyle1 = function() {
      //$scope.
      console.log("change to class 1");

       $scope.wstyle = "style1";
    };

    $scope.changeStyle2 = function() {
      console.log("change to class 2");

       $scope.wstyle = "style2";
    };

    $scope.changeStyle3 = function() {
      console.log("change to class 3");

       $scope.wstyle = "style3";
    };


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
