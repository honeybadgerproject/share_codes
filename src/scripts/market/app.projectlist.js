;(function() {
"use strict";


angular.module("app.projectlist" , [])

// Root Controller
.controller("projectListCtrl", ["$rootScope", "$scope", "$http", "$timeout", "$window", "Facebook", "UserFacebookID" ,
        function($rs, $scope, $http, $timeout, $window, Facebook, UserFacebookID) {



          $scope.addnewproject = function(newproject) {
            console.log("------addnewproject------");
            // asign last updated project and created on
            newproject.last_update = new Date();
            newproject.created_on = new Date();
            // change the add user_owner by and array
            newproject.user_owner = [ { owner: '123456789', //UserFacebookID.user.id ,
                                      role: 'admin' } ];
            // asign the name for the user
            newproject.user_name = "nombre temporal"; //UserFacebookID.user.name;
            newproject.project_style = "solid";
            newproject.phase = "1";

            $http.post('/projectlist', newproject).success(function(response) {
              console.log(response);
              refreshProjectList();
            });

            console.log(newproject);
          };

          $scope.remove = function() {
            console.log("remove");
          };

          $scope.edit = function() {
            console.log("edit");
          };

          $scope.select = function(id) {
            console.log("into select");
          };

          $scope.update = function() {
            console.log("update");
          };

          /*---- selected project ----*/
          $scope.selectProjectLabel = function(setLabel, id) {
            console.log("selectProjectLabel");
          };

          $scope.isSelectedProjectLabel  = function(checkLabel) {
            console.log("isSelectedProjectLabel");
          };

          $scope.classLabelFa = function(checkLabel, id) {
            console.log("classLabelFa");
          };




}])

// Root Controller
.controller("refreshProjectListCtrl", ["$scope", "$http", "UserFacebookID" ,
        function($scope, $http, UserFacebookID) {

          /*---- project selected and global variables ----*/
        	$scope.tabIndexLabel = 0;
        	$scope.projectlist = {};
        	$scope.project = {};
        	//$scope.style_css = {item: ''};

        	/*$scope.refreshProjectListHtml = function() {
        			console.log("refreshProjectListHtml");
        	};*/

        $scope.refreshProjectList = function() {
        		console.log("------refreshProjectList------");
        		//'UserFacebookID.user.id'
        		$http.get('/refreshProjectWithUser/' + '123456789').success(function(response) {
        			console.log("refresh");
        			$scope.projectlist = response;
        		});

        };

        $scope.returnIonTag = function(phase) {
            if(phase == "1") "right ion ion-ios-flask-outline icon";
            else if(phase == "2") "right ion ion-ios-pulse icon";
            else "right ion ion-ios-cloud-download-outline icon";
        };

        $scope.returnPanelFooter = function(phase) {
            if(phase == "1") "panel-footer clearfix panel-footer-sm panel-footer-info";
            else if(phase == "2") "panel-footer clearfix panel-footer-sm panel-footer-success";
            else "panel-footer clearfix panel-footer-sm panel-footer-pink";
        };

        $scope.select = function(id) {
          console.log("into select");
          UserFacebookID.project_id = id;
        };

}])




// #end
})()
