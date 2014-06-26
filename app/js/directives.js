'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

.directive('onReadFile', function ($parse) {
	return {
            restrict: 'A',
            scope: false,
            link: function(scope, element, attrs) {
                var fn = $parse(attrs.onReadFile);

                    element.on('change', function(onChangeEvent) {
                            var reader = new FileReader();

                            reader.onload = function(onLoadEvent) {
                                    scope.$apply(function() {
                                            fn(scope, {$fileContent:onLoadEvent.target.result});
                                    });
                            };

                            var file = (onChangeEvent.srcElement || onChangeEvent.target).files[0];
                            
                            if(file)
                                reader.readAsText(file);
                    });
                }
        };
})
.directive('context', [function() {
    return {
      restrict    : 'A',
      scope       : '@&', 
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          post: function postLink(scope, iElement, iAttrs, controller) {
            var ul = $('#' + iAttrs.context),
                last = null;
            
            ul.css({ 'display' : 'none'});
  
            $(iElement).bind('contextmenu', function(event) {
              ul.css({
                position: "fixed",
                display: "block",
                left: event.clientX + 'px',
                top:  event.clientY + 'px'
              });
              last = event.timeStamp;
              
              return false;
            });
            
            $(document).click(function(event) {
              var target = $(event.target);
              if(!target.is(".popover") && !target.parents().is(".popover")) {
                if(last === event.timeStamp)
                  return;  
                ul.css({
                  'display' : 'none'
                });
              }
            });
          }
        };
      }
    };
}]);