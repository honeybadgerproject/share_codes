;(function() {
"use strict";

angular.module("app.hackingzone" , [])


// Root Controller
.controller("refreshProjectListCtrl", ["$scope", "$http", "UserFacebookID" ,
        function($scope, $http, UserFacebookID) {

          /*---- project selected and global variables ----*/
        	$scope.collaboratorlist = {};
        	$scope.resourcelist = {};
          $scope.collaborator = {};

        /*  var refreshResourceList = function() {

            if(UserFacebookID.user.id) {

              var listParams = {
                user_owner: UserFacebookID.user.id,
                project_id: UserFacebookID.project_id
              };

              $http.post('/resourcelistowner', listParams ).success(function(response) {
                console.log("refresh");
                $scope.resourcelist = response;
                $scope.resource = "";
              });
            }
          };*/



        $scope.addnewresource = function(newresource) {
          console.log(newresource);
          console.log($scope.resource);
          if(UserFacebookID.user.id) {

            newresource.user_owner = UserFacebookID.user.id;
            newresource.id_project = UserFacebookID.project_id;
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

        $scope.refreshHackingZoneList = function() {

          console.log("------refreshHackingList------");

          if(UserFacebookID.user.id) {

            var listParams = {
              user_owner: UserFacebookID.user.id,
              project_id: UserFacebookID.project_id
            };
              console.log(listParams);

            $http.post('/contributorslistowner/', listParams).success(function(response) {
              console.log("refresh contributor list");
              $scope.contributorslist = response;
              console.log($scope.contributorslist);
            });
          }

        };

        $scope.refreshProjectList = function() {
        		console.log("------refreshProjectList------");
        		//'UserFacebookID.user.id'
        		$http.get('/refreshProjectWithUser/' + '123456789').success(function(response) {
        			console.log("refresh");
        			$scope.projectlist = response;
        		});

        };


}])




// #end
})()
