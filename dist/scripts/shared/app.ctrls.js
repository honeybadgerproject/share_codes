!function(){"use strict";angular.module("app.ctrls",[]).controller("AppCtrl",["$rootScope","$scope","$timeout",function($rs,$scope,$timeout){var mm=window.matchMedia("(max-width: 767px)");$rs.isMobile=mm.matches?!0:!1,$rs.safeApply=function(fn){var phase=this.$root.$$phase;"$apply"==phase||"$digest"==phase?fn&&"function"==typeof fn&&fn():this.$apply(fn)},mm.addListener(function(m){$rs.safeApply(function(){$rs.isMobile=m.matches?!0:!1})}),$scope.navFull=!0,$scope.toggleNav=function(){$scope.navFull=$scope.navFull?!1:!0,$rs.navOffCanvas=$rs.navOffCanvas?!1:!0,console.log("navOffCanvas: "+$scope.navOffCanvas),$timeout(function(){$rs.$broadcast("c3.resize")},260)},$scope.toggleSettingsBox=function(){$scope.isSettingsOpen=$scope.isSettingsOpen?!1:!0},$scope.themeActive="theme-zero",$scope.fixedHeader=!0,$scope.navHorizontal=!1;var SETTINGS_STATES="_setting-states",statesQuery={get:function(){return JSON.parse(localStorage.getItem(SETTINGS_STATES))},put:function(states){localStorage.setItem(SETTINGS_STATES,JSON.stringify(states))}},sQuery=statesQuery.get()||{navHorizontal:$scope.navHorizontal,fixedHeader:$scope.fixedHeader,navFull:$scope.navFull,themeActive:$scope.themeActive};sQuery&&($scope.navHorizontal=sQuery.navHorizontal,$scope.fixedHeader=sQuery.fixedHeader,$scope.navFull=sQuery.navFull,$scope.themeActive=sQuery.themeActive),$scope.onNavHorizontal=function(){sQuery.navHorizontal=$scope.navHorizontal,statesQuery.put(sQuery)},$scope.onNavFull=function(){sQuery.navFull=$scope.navFull,statesQuery.put(sQuery),$timeout(function(){$rs.$broadcast("c3.resize")},260)},$scope.onFixedHeader=function(){sQuery.fixedHeader=$scope.fixedHeader,statesQuery.put(sQuery)},$scope.onThemeActive=function(){sQuery.themeActive=$scope.themeActive,statesQuery.put(sQuery)},$scope.onThemeChange=function(theme){$scope.themeActive=theme,$scope.onThemeActive()}}]).controller("HeadCtrl",["$scope","Fullscreen",function($scope,Fullscreen){$scope.toggleFloatingSidebar=function(){$scope.floatingSidebar=$scope.floatingSidebar?!1:!0,console.log("floating-sidebar: "+$scope.floatingSidebar)},$scope.goFullScreen=function(){Fullscreen.isEnabled()?Fullscreen.cancel():Fullscreen.all()}}]).controller("DashboardCtrl",["$scope",function($scope){$scope.analyticsconfig={data:{columns:[["Network Load",30,100,80,140,150,200],["CPU Load",90,100,170,140,150,50]],type:"spline",types:{"Network Load":"bar"}},color:{pattern:["#3F51B5","#38B4EE","#4CAF50","#E91E63"]},legend:{position:"inset"},size:{height:330}},$scope.storageOpts={size:100,lineWidth:2,lineCap:"square",barColor:"#E91E63"},$scope.storagePercent=80,$scope.serverOpts={size:100,lineWidth:2,lineCap:"square",barColor:"#4CAF50"},$scope.serverPercent=35,$scope.clientOpts={size:100,lineWidth:2,lineCap:"square",barColor:"#FDD835"},$scope.clientPercent=54,$scope.browserconfig={data:{columns:[["Chrome",48.9],["Firefox",16.1],["Safari",10.9],["IE",17.1],["Other",7]],type:"donut"},size:{width:260,height:260},donut:{width:50},color:{pattern:["#3F51B5","#4CAF50","#f44336","#E91E63","#38B4EE"]}}}])}();