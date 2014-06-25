'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

  .controller('SongCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
        $scope.lines = [];
        $scope.songName = '11';
  
        var createItem = function(note){
            var file = (note.name=='newline') ? 'newline_note.png' : note.file;
            
            return {name:note.name, file:file};
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
        
        /* Export song into json file */
        $scope.export = function(){
            var a, result = [];
            
            if(!$scope.songName){
                alert('Specify song name please');
                return false;
            }
            
            angular.forEach($scope.lines, function(line){
                angular.forEach(line, function(note){
                    result.push({name: note.name});
                });
            });
            
            a = document.createElement('a');
            a.download = $scope.songName + ".json";
            a.href = window.URL.createObjectURL( 
                new Blob([ angular.toJson(result, true) ], 
                { type : 'application/json' })
            );
            
            a.textContent = "Download " + a.download;
            a.click();
        }
  
        $rootScope.$on('addNote', function(event, note) {
            if(note.name=='newline')
                addLine();
            
            addNote(note);
        });
  }])
  
  .controller('ElementsCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
          $scope.notes = [
              {name: 'pre_meri', title: 'Pre meri', file: 'pre meri.png'}
              ,{name: 'newline', title: 'Newline', file: 'new line.png'}
              ,{name: 'accent', title: 'Accent', file: 'accent.png'}
              ,{name: 'beat', title: 'Beat', file: 'beat.png'}
              ,{name: 'bar', title: 'Bar', file: 'bar.png'}
              ,{name: 'ro_meri', title: 'RO meri', file: 'ro meri.png'}
              ,{name: 'ro', title: 'RO', file: 'ro.png'}
              ,{name: 'tsu_meri', title: 'TSU meri', file: 'tsu meri.png'}
              ,{name: 'tsu', title: 'TSU', file: 'tsu.png'}
              ,{name: 're', title: 'RE', file: 're.png'}
              ,{name: 'u_meri', title: 'U meri', file: 'u meri.png'}
              ,{name: 'u', title: 'U', file: 'u.png'}
              ,{name: 'ha', title: 'HA', file: 'ha.png'}
              ,{name: 'hi', title: 'HI', file: 'hi.png'}
          ];
          
          $scope.addNote = function(note){
              $rootScope.$broadcast('addNote', note);
          }
  }]);
