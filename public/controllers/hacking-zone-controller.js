var myHacking = angular.module('myApp');


myHacking.controller('hackingZoneCtrl', function($scope, $http, $modal, $log, UserFacebookID) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.modalInstance;

  /* ----- tab controller ------*/

  /** holds tabs, we will perform repeat on this **/
  $scope.tabs = [{
    id:1,
    content:'This is a default tab on load'
  }]

  $scope.counter = 1;
  /** Function to add a new tab **/
  $scope.addTab = function(){
    $scope.counter++;
    $scope.tabs.push({id:$scope.counter,content:'Any Content'});
    $scope.selectedTab = $scope.tabs.length - 1; //set the newly added tab active.
  }

  /** Function to delete a tab **/
  $scope.deleteTab = function(index){
    $scope.tabs.splice(index,1); //remove the object from the array based on index
  }

  $scope.selectedTab = 0; //set selected tab to the 1st by default.

  /** Function to set selectedTab **/
  $scope.selectTab = function(index){
    $scope.selectedTab = index;
  }

  /*---- resources ----*/

  var refreshResourceList = function() {

    if(UserFacebookID.user.id) {

      $http.get('/resourcelistowner/' + UserFacebookID.user.id ).success(function(response) {
        console.log("refresh");
        $scope.resourcelist = response;
        $scope.resource = "";
      });
    }
  };

    refreshResourceList();

    $scope.addnewresource = function(newresource) {
      console.log(newresource);
      console.log($scope.resource);
      if(UserFacebookID.user.id) {

        newresource.user_owner = UserFacebookID.user.id;
        $http.post('/resourcelist', newresource).success(function(response) {
          console.log(response);
          if($scope.modalInstance)
          {
            $scope.modalInstance.close();
          }
          refreshResourceList();
        });
      }
    };

    $scope.removeresource = function(id) {
      console.log(id);
      $http.delete('/resourcelist/' + id).success(function(response) {
        refreshResourceList();
      });
    };

  /*---- contributors ----*/

  var refreshContributorsList = function() {

    if(UserFacebookID.user.id) {

      $http.get('/contributorslistowner/' + UserFacebookID.user.id).success(function(response) {
        console.log("refresh");
        $scope.contributorslist = response;
        $scope.contributor = "";
      });
    }
  };

  refreshContributorsList();


  $scope.addnewcontributor = function(newcontributor) {
    console.log(newcontributor);
    console.log($scope.contributor);
    if(UserFacebookID.user.id) {
      newcontributor.user_owner = UserFacebookID.user.id;
      $http.post('/contributorslist', newcontributor).success(function(response) {
        console.log(response);

        if($scope.modalInstance)
        {
          $scope.modalInstance.close();
        }

        refreshContributorsList();
      });
    };
  };

  $scope.removecontributor = function(id) {
    console.log(id);
    $http.delete('/contributorslist/' + id).success(function(response) {
      refreshContributorsList();
    });
  };

  /*---- tabs ----*/

  var refreshTabList = function() {


    if(UserFacebookID.user.id) {

      $http.get('/tablistowner/' + UserFacebookID.user.id).success(function(response) {
        console.log("refresh");
        $scope.tablist = response;
        $scope.tab = "";
      });
    }
  };

  refreshTabList();


  $scope.addnewtab = function(newtab) {
    console.log(newtab);
    console.log($scope.tab);

    if(UserFacebookID.user.id) {
      newtab.user_owner = UserFacebookID.user.id;
      newtab.id_tab = "";
      newtab.tab_name = "";
      newtab.tab_content = "";
      $http.post('/tablist', newtab).success(function(response) {
        console.log(response);
        refreshTabList();
      });
    }
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
