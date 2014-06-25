'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

  .controller('SongCtrl', ['$scope', '$rootScope','notesService', function($scope, $rootScope, notesService) {
        $scope.lines = [];
        $scope.songName = '';
  
        var createItem = function(note){
            var file = (note.name=='newline') ? 'newline_note.png' : note.file;
            
            return {name:note.name, file:file};
        }
  
        var addNote = function(note){
            if(note.name=='newline')
                addLine();
            
            if(! $scope.lines.length)
                addLine();
            
            var cnt = $scope.lines.length, line = $scope.lines[cnt-1];
            
            line.push( createItem(note) );
        }
        
        var addLine = function(){
            $scope.lines.push([]);
        }
        
        var clearSong = function(){
            $scope.lines = [];
        }
        
        /* Export song into json file */
        $scope.export = function(){
            var a, result = {notes: []};
            
            if(!$scope.songName){
                alert('Specify song name please');
                return false;
            }
            
            angular.forEach($scope.lines, function(line){
                angular.forEach(line, function(note){
                    result.notes.push({name: note.name});
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
        
        /* Import song from json file */
        $scope.import = function($fileContent){
            clearSong();
            var json;
            
            try {
                json = angular.fromJson($fileContent);
                
                if( !json || !json.notes )
                    throw 'Invalid file';
            }catch(e){
                alert('Invalid file');
                
                return false;
            }
            
            angular.forEach(json.notes, function(item){
                var note = notesService.getNote(item.name);
                
                if(!note){
                    alert('Wrong item');
                    
                    return false;
                }
                
                addNote(note);
            });
            
        }
  
        $rootScope.$on('addNote', function(event, note) {
            addNote(note);
        });
  }])
  
  .controller('ElementsCtrl', ['$scope', '$rootScope', 'notesService', function($scope, $rootScope, notesService) {
          $scope.notes = notesService.getNotesElements();
          
          $scope.addNote = function(note){
              $rootScope.$broadcast('addNote', note);
          }
  }]);
