!function(window){var createModule=function(angular){var module=angular.module("FBAngular",[]);return module.factory("Fullscreen",["$document","$rootScope",function($document,$rootScope){var document=$document[0],isKeyboardAvailbleOnFullScreen="undefined"!=typeof Element&&"ALLOW_KEYBOARD_INPUT"in Element&&Element.ALLOW_KEYBOARD_INPUT,emitter=$rootScope.$new();$document.on("fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange",function(){emitter.$emit("FBFullscreen.change",serviceInstance.isEnabled())});var serviceInstance={$on:angular.bind(emitter,emitter.$on),all:function(){serviceInstance.enable(document.documentElement)},enable:function(element){element.requestFullScreen?element.requestFullScreen():element.mozRequestFullScreen?element.mozRequestFullScreen():element.webkitRequestFullscreen?/Version\/[\d]{1,2}(\.[\d]{1,2}){1}(\.(\d){1,2}){0,1} Safari/.test(navigator.userAgent)?element.webkitRequestFullscreen():element.webkitRequestFullscreen(isKeyboardAvailbleOnFullScreen):element.msRequestFullscreen&&element.msRequestFullscreen()},cancel:function(){document.cancelFullScreen?document.cancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.msExitFullscreen&&document.msExitFullscreen()},isEnabled:function(){var fullscreenElement=document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement;return fullscreenElement?!0:!1},toggleAll:function(){serviceInstance.isEnabled()?serviceInstance.cancel():serviceInstance.all()},isSupported:function(){var docElm=document.documentElement,requestFullscreen=docElm.requestFullScreen||docElm.mozRequestFullScreen||docElm.webkitRequestFullscreen||docElm.msRequestFullscreen;return requestFullscreen?!0:!1}};return serviceInstance}]),module.directive("fullscreen",["Fullscreen",function(Fullscreen){return{link:function($scope,$element,$attrs){if($attrs.fullscreen){$scope.$watch($attrs.fullscreen,function(value){var isEnabled=Fullscreen.isEnabled();value&&!isEnabled?(Fullscreen.enable($element[0]),$element.addClass("isInFullScreen")):!value&&isEnabled&&(Fullscreen.cancel(),$element.removeClass("isInFullScreen"))});var removeFullscreenHandler=Fullscreen.$on("FBFullscreen.change",function(evt,isFullscreenEnabled){isFullscreenEnabled||$scope.$evalAsync(function(){$scope.$eval($attrs.fullscreen+"= false"),$element.removeClass("isInFullScreen")})});$scope.$on("$destroy",function(){removeFullscreenHandler()})}else{if(void 0!==$attrs.onlyWatchedProperty)return;$element.on("click",function(ev){Fullscreen.enable($element[0])})}}}}]),module};"function"==typeof define&&define.amd?define("FBAngular",["angular"],function(angular){return createModule(angular)}):createModule(window.angular)}(window);