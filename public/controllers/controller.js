var myApp = angular.module('myApp',['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {

  //$urlRouterProvider.otherwise('/index');

  $stateProvider.state("index", {
    url: '',
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

myApp.controller('AppCtrl', function($scope, $http) {

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
