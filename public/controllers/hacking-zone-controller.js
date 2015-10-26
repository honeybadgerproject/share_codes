var myHacking = angular.module('myApp');


myHacking.controller('hackingZoneCtrl', function($scope, $http, $timeout) {

  /*---- resources ----*/

  var refreshResourceList = function() {
    $http.get('/resourcelist').success(function(response) {
      console.log("refresh");
      $scope.resourcelist = response;
      $scope.resource = "";
    });
  };

    refreshResourceList();

    $scope.addnewresource = function(newresource) {
      console.log(newresource);
      console.log($scope.resource);

      $http.post('/resourcelist', newresource).success(function(response) {
        console.log(response);
        refreshResourceList();
      });
    };

    $scope.removecontributor = function(id) {
      console.log(id);
      $http.delete('/resourcelist/' + id).success(function(response) {
        refreshResourceList();
      });
    };

  /*---- contributors ----*/

  var refreshContributorsList = function() {
    $http.get('/contributorslist').success(function(response) {
      console.log("refresh");
      $scope.contributorslist = response;
      $scope.contributor = "";
    });
  };

  refreshContributorsList();


  $scope.addnewcontributor = function(newcontributor) {
    console.log(newcontributor);
    console.log($scope.contributor);

    $http.post('/contributorslist', newcontributor).success(function(response) {
      console.log(response);
      refreshContributorsList();
    });
  };

  $scope.removecontributor = function(id) {
    console.log(id);
    $http.delete('/contributorslist/' + id).success(function(response) {
      refreshContributorsList();
    });
  };

});
