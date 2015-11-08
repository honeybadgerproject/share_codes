var myHacking = angular.module('myApp');


myHacking.controller('hackingZoneCtrl', function($scope, $http, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.modalInstance;

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
        if($scope.modalInstance)
        {
          $scope.modalInstance.close();
        }
        refreshResourceList();
      });
    };

    $scope.removeresource = function(id) {
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

      if($scope.modalInstance)
      {
        $scope.modalInstance.close();
      }

      refreshContributorsList();
    });
  };

  $scope.removecontributor = function(id) {
    console.log(id);
    $http.delete('/contributorslist/' + id).success(function(response) {
      refreshContributorsList();
    });
  };

  /*---- tabs ----*/

  var refreshTabList = function() {
    $http.get('/tablist').success(function(response) {
      console.log("refresh");
      $scope.tablist = response;
      $scope.tab = "";
    });
  };

  refreshTabList();


  $scope.addnewtab = function(newtab) {
    console.log(newtab);
    console.log($scope.tab);

    $http.post('/tablist', newtab).success(function(response) {
      console.log(response);
      refreshTabList();
    });
  };

  $scope.removetab = function(id) {
    console.log(id);
    $http.delete('/tablist/' + id).success(function(response) {
      refreshTabList();
    });
  };


  $scope.edittab = function(id) {

    console.log(id);
    console.log("into tab");
    $http.get('/tablist/' + id).success(function(response) {
      $scope.tab = response;
    });
  };

  $scope.updatetab = function(newtab) {
    console.log("add this edit tab");
    console.log(newtab);
    console.log("end add this edit tab");
    console.log($scope.tab._id);

    $http.put('/tablist/' + newtab._id, newtab).success(function(response) {
      refreshTabList();
    });
  };


  /****  Dialog ****/


  $scope.openDialogCollaborator = function() {

    $scope.modalInstance = $modal.open({
            templateUrl: 'views/modalCollaborator.html',
            scope: $scope
        });
        console.log('modal opened');
        $scope.modalInstance.result.then(function () {
            console.log($scope.selected);
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });

  };

  $scope.openDialogResource = function() {

    $scope.modalInstance = $modal.open({
            templateUrl: 'views/modalResource.html',
            scope: $scope
        });
        console.log('modal opened');
        $scope.modalInstance.result.then(function () {
            console.log($scope.selected);
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });

  };

});
