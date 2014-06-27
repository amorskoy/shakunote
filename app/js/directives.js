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
}])

.directive('draggable', function() {
  return function(scope, element) {
    // this gives us the native JS object
    var el = element[0];
    
    el.draggable = true;
    
    el.addEventListener(
      'dragstart',
      function(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('Text', this.id);
        this.classList.add('drag');
        return false;
      },
      false
    );
    
    el.addEventListener(
      'dragend',
      function(e) {
        this.classList.remove('drag');
        return false;
      },
      false
    );
  }
})

.directive('droppable', function() {
  return {
    scope: {
      drop: '&',
      bin: '='
    },
    link: function(scope, element) {
      // again we need the native object
      var el = element[0];
      
      el.addEventListener(
        'dragover',
        function(e) {
          e.dataTransfer.dropEffect = 'move';
          // allows us to drop
          if (e.preventDefault) e.preventDefault();
          this.classList.add('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'dragenter',
        function(e) {
          this.classList.add('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'dragleave',
        function(e) {
          this.classList.remove('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'drop',
        function(e) {
          // Stops some browsers from redirecting.
          if (e.stopPropagation) e.stopPropagation();
          
          this.classList.remove('over');
          
          var dstId = this.id, srcId = e.dataTransfer.getData('Text');
          
          // call the passed drop function
          scope.$apply(function(scope) {
            var fn = scope.drop();
            if ('undefined' !== typeof fn) {            
              fn(srcId, dstId);
            }
          });
          
          return false;
        },
        false
      );
    }
  }
});