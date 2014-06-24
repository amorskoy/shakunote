'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

  .controller('SongCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
        $scope.lines = [];
  
        var createItem = function(note){
            return {name:note.name, file:note.file};
        }
  
        var addNote = function(note){
            if(! $scope.lines.length)
                addLine();
            
            var cnt = $scope.lines.length, line = $scope.lines[cnt-1];
            
            line.push( createItem(note) );
        }
        
        var addLine = function(){
            $scope.lines.push([]);
        }
  
        $rootScope.$on('addNote', function(event, note) {
            if(note.name=='newline')
                addLine();
            else
                addNote(note);
        });
  }])
  
  .controller('ElementsCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
          $scope.notes = [
              {name: 'ro_meri', title: 'RO meri', file: 'ro meri.png'}
              ,{name: 'ro', title: 'RO', file: 'ro.png'}
              ,{name: 'tsu_meri', title: 'TSU meri', file: 'tsu meri.png'}
              ,{name: 'tsu', title: 'TSU', file: 'tsu.png'}
              ,{name: 're', title: 'RE', file: 're.png'}
              ,{name: 'u_meri', title: 'U meri', file: 'u meri.png'}
              ,{name: 'u', title: 'U', file: 'u.png'}
              ,{name: 'ha', title: 'HA', file: 'ha.png'}
              ,{name: 'hi', title: 'HI', file: 'hi.png'}
              ,{name: 'pre_meri', title: 'Pre meri', file: 'pre meri.png'}
              ,{name: 'newline', title: 'Newline', file: 'new line.png'}
              ,{name: 'accent', title: 'Accent', file: 'accent.png'}
              ,{name: 'beat', title: 'Beat', file: 'beat.png'}
              ,{name: 'bar', title: 'Bar', file: 'bar.png'}
          ];
          
          $scope.addNote = function(note){
              $rootScope.$broadcast('addNote', note);
          }
  }]);
