var myHacking = angular.module('myApp');


myHacking.controller('hackingZoneCtrl', function($scope, $http, $modal, $log, UserFacebookID) {

  //$scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.modalInstance;

  /* ----- tab controller ------*/

  /** holds tabs, we will perform repeat on this **/
  /*$scope.tabs = [{
    id:1,
    content:'This is a default tab on load'
  }]

  $scope.counter = 1;*/
  /** Function to add a new tab **/
  /*$scope.addTab = function(){
    $scope.counter++;
    $scope.tabs.push({id:$scope.counter,content:'Any Content'});
    $scope.selectedTab = $scope.tabs.length - 1; //set the newly added tab active.
  }*/

  /** Function to delete a tab **/
  /*$scope.deleteTab = function(index){
    $scope.tabs.splice(index,1); //remove the object from the array based on index
  }

  $scope.selectedTab = 0; //set selected tab to the 1st by default.
*/
  /** Function to set selectedTab **/
  /*$scope.selectTab = function(index){
    $scope.selectedTab = index;
  }*/

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

  $scope.tabIndex = 1;

  $scope.selectTab = function(setTab) {
    console.log("set Tab: " + setTab);
    $scope.tabIndex = setTab;
  };

  $scope.isSelected  = function(checkTab) {
      console.log("check Tab: " + checkTab);
    return $scope.tabIndex === checkTab;
  };


  var refreshNoteList = function() {
    if(UserFacebookID.user.id) {

      $http.get('/notelistowner/' + UserFacebookID.user.id).success(function(response) {
        console.log("refresh tab");
        $scope.notelist = response;
        console.log($scope.notelist);
        $scope.note = "";
      });
    }
  };

  refreshNoteList();


  $scope.addnewtab = function() {
    //console.log(newtab);
    console.log("add ntew note");

    if(UserFacebookID.user.id) {

      var newnote = {
        user_owner: UserFacebookID.user.id,
        id_tab: "note",
        tab_name: "note",
        tab_content: ""
      };
      console.log(newnote);
      $http.post('/notelist', newnote).success(function(response) {
        console.log(response);
        refreshNoteList();
      });
    }
  };

  $scope.removetab = function(id) {
    console.log(id);
    $http.delete('/notelist/' + id).success(function(response) {
      refreshNoteList();
    });
  };


  $scope.edittab = function(id) {

    console.log(id);
    console.log("into tab");
    $http.get('/notelist/' + id).success(function(response) {
      $scope.note = response;
    });
  };

  $scope.updatetab = function(newtab) {
    console.log("add this edit tab");
    console.log(newtab);
    console.log("end add this edit tab");
    console.log($scope.newtab._id);

    $http.put('/notelist/' + newtab._id, newtab).success(function(response) {
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
