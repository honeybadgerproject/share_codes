var myApp = angular.module('myApp',['ui.router', 'facebook', 'braintree-angular', 'ct.ui.router.extras', 'ui.bootstrap', 'ui.bootstrap.modal', 'ngCookies']);



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

  /* login */
  $stateProvider.state("index", {
    url: '',
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
  /* test elements*/
  $stateProvider.state("testelement", {
    url: '/testelement',
    templateUrl: 'views/testElement.html' ,
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
      requireLogin: true
    }
  });
  /* edit and save new project */
  $stateProvider.state("saveproject", {
    url: '/update',
    abstract: true,
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
  /* jump to preview the project */
  $stateProvider.state("viewproject", {
    url: '/viewproject',
    templateUrl: 'views/viewproject.html' ,
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


});

myApp.controller('AppCtrl', function($scope, $http, $timeout, $cookies, $cookieStore, $window, Facebook, UserFacebookID) {


    console.log("heloo wombath codes - inside AppCtrl");


    $scope.changeStyle1 = function() {

    //  console.log("change to class 1");

       $scope.wstyle = "style1";
    };

    $scope.changeStyle2 = function() {
      //console.log("change to class 2");

       $scope.wstyle = "style2";
    };

    $scope.changeStyle3 = function() {
      //console.log("change to class 3");

       $scope.wstyle = "style3";
    };



    //// >> on for emit
    $scope.$on('refreshProjectList', function () {
      console.log("////>> called by emit " );
      refreshProjectList();
    });

    $scope.refreshProjectListHtml = function() {
      console.log("refresh projectlist:  " + UserFacebookID.logged );
      refreshProjectList();
    };

    var refreshProjectList = function() {
      console.log("UserFacebookID.logged:  " + UserFacebookID.logged );
      if(UserFacebookID.logged == true) {
        console.log("in user face id for projects");


        /* cache the user */
        console.log("cache >> step 3... adding the user info to cache");
      /*  if (!angular.isUndefined(UserFacebookID.cache.get('userCached'))) {
          console.log("cache >> step 5  cached key: userCached , value: " + UserFacebookID.cache.get('userCached') );
          UserFacebookID.user = UserFacebookID.cache.get('userCached');
          console.log(UserFacebookID.user);
        }*/

        // Get cookie
        UserFacebookID.user = $cookieStore.get('userCached');
        console.log(UserFacebookID.user);



        $http.get('/refreshProjectWithUser/' + UserFacebookID.user.id).success(function(response) {
          console.log("refresh");
          $scope.projectlist = response;
          $scope.project = "";
          $scope.style_css = {item: ''};
          //if($scopelist) console.log($scopelist);
        });
      }


    };

    /*---- tabs ----*/

    $scope.tabIndexLabel = 0;

    $scope.selectProjectLabel = function(setLabel, id) {
      console.log("set Label: " + setLabel);
      console.log(id);
      $scope.tabIndexLabel = setLabel;
      $scope.project = id;
    };

    $scope.isSelectedProjectLabel  = function(checkLabel) {
        console.log("check Label: " + checkLabel);
      return $scope.tabIndexLabel === checkLabel;
    };

    $scope.classLabelFa = function(checkLabel, id) {
        console.log("class Label: " + checkLabel);
        var styleLabel = 'fa fa-square';
        if($scope.tabIndexLabel === checkLabel) {
          styleLabel = 'fa fa-check-square';
          project = id;
        }
      return styleLabel;
    };


  //  refreshProjectList();


    $scope.addnewproject = function(newproject) {
      console.log(newproject);
      console.log($scope.project);

      // asign last updated project and created on
      newproject.project_last_update = new Date();
      newproject.project_created_on = new Date();
      newproject.user_owner = UserFacebookID.user.id;
      newproject.user_name = UserFacebookID.user.name;
      project.project_style = "solid";

      $http.post('/projectlist', newproject).success(function(response) {
        console.log(response);
        refreshProjectList();
      });
    };

    $scope.remove = function() {
      console.log($scope.project._id);
      var id = $scope.project._id;
      $http.delete('/projectlist/' + id).success(function(response) {
        refreshProjectList();
      });
    };

    $scope.edit = function() {

      console.log($scope.project._id);
      var id = $scope.project._id;
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

      // update date
      console.log("old date " + $scope.project.project_last_update);
      $scope.project.project_last_update = new Date();
      console.log("new date " + $scope.project.project_last_update);

      $http.put('/projectlist/' + $scope.project._id, $scope.project).success(function(response) {
        refreshProjectList();
      });
    };

    /* find the word in the database */

    $scope.search = function() {

      console.log("search text: " + $scope.search.text_search);

      //var findRes = new Array();
      //console.log("antes de if: " + $scope.search.text_search);
      if($scope.search.text_search)
      {
        $http.get('/search/' + $scope.search.text_search, $scope.search).success(function(response) {
          //findRes = response;
          var items = [];
          //console.log("inicio findRes: ");
          //console.log(response);
          //console.log("fin findRes");

          ////--------------------------------------
          var indexF = 0;
          var str = new String();
          var text = $scope.search.text_search;
          for (i = 0; i < response.length; i++) {
            var tempFindOverview = response[i].project_overview;
            console.log("primer for: " + tempFindOverview);
            if(tempFindOverview)
            {
              var n = tempFindOverview.search(text);
              //console.log("number: " + n);
              if(n >= 0) {
                items.push(response[i]);
                console.log("inex: " + indexF + " - item: " + items[indexF].project_title);
                indexF++;
              }
            }
          }

          $scope.findresults = items;
        });
      }
    };


});
