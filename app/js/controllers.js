'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

  .controller('SongCtrl', ['$scope', '$rootScope','notesService', function($scope, $rootScope, notesService) {
        $scope.lines = [];
        $scope.songName = '';
        $scope.context = null;
        $scope.contextLine = null;
        
        var noteCounter = 0; //local note counter auto_increment for id generation
  
        var createItem = function(note){
            var file = (note.name=='newline') ? 'newline_note.png' : note.file;
            
            return {name:note.name, file:file, id: noteCounter};
        }
  
        var pushNote = function(note){
            if( !$scope.context ){
                noteCounter++;
                
                /* When song note is not selected - add note*/
                
                if(note.name=='newline')
                    addLine();

                if(! $scope.lines.length)
                    addLine();

                var cnt = $scope.lines.length, line = $scope.lines[cnt-1];

                line.notes.push( createItem(note) );
            }else{
                /* When song note is selected - replace note */
                
                if(note.name!='newline'){
                    $scope.context.name = note.name;
                    $scope.context.file = note.file;
                    $scope.context.selected = true;
                }
            }
        }
        
        var insertNote = function(name, line, num){
            noteCounter++;
            
            var note = notesService.getNote(name)
                , item = createItem(note), arr = $scope.lines[line].notes;
            
            if(arr.length == num+1)
                arr.push(item);
            else
                arr.splice(num+1, 0, item);
        }
        
        var addLine = function(){
            $scope.lines.push({notes:[]});
        }
        
        var clearSong = function(){
            $scope.lines = [];
        }
        
        var parseNoteId = function(id){
            for( var l in $scope.lines ){
                for( var n in $scope.lines[l].notes ){
                   if($scope.lines[l].notes[n].id == id)
                       break;
                }
            }
            
            return {line: parseInt(l), num: parseInt(n)};
        }
        
        /* Export song into json file */
        $scope.export = function(){
            var a, result = {songName:'', notes: []};
            
            if(!$scope.songName){
                alert('Specify song name please');
                return false;
            }
            
            result.songName = $scope.songName;
            
            angular.forEach($scope.lines, function(line){
                angular.forEach(line.notes, function(note){
                    if(!note.deleted)
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
                
                pushNote(note);
            });
            
            if( json.songName != undefined )
                $scope.songName = json.songName;
            
        }
        
        /* Select note */
        $scope.toggleNote = function(note){
            if($scope.context && $scope.context.selected)
                $scope.context.selected = false;

            if( $scope.context !== note ){
                $scope.context = note;
                $scope.context.selected = true;
            }else{
                $scope.context = null;
            }
        }
        
        /* Select line */
        $scope.toggleLine = function(line){
            if($scope.contextLine && $scope.contextLine.selected)
                $scope.contextLine.selected = false;

            if( $scope.contextLine !== line ){
                $scope.contextLine = line;
                $scope.contextLine.selected = true;
            }else{
                $scope.contextLine = null;
            }
        }
        
        /* Clear previous song file uploaded */
        $scope.clearUpload = function($event){
            $event.currentTarget.value = null;
        }
        
        /* Remove whoole line from song */
        $scope.removeLine = function(){
            if( $scope.contextLine ){
                var idx = $scope.lines.indexOf( $scope.contextLine );
                
                if(idx >= 0)
                    $scope.lines.splice(idx, 1);
            }
        }
        
        /* Remove note from song */
        $scope.removeNote = function(){
            if(!$scope.context)
               return;
            
            var found = false;
            
            angular.forEach($scope.lines, function(line){
                if(!found){
                    var idx = line.notes.indexOf( $scope.context );

                    if( idx >= 0 ){
                        line.notes.splice(idx, 1);
                        found = true;
                    }
                }
            });
           
            $scope.context = null;
        }
        
        /* Handle drop element into song */
  
        $scope.handleDropNote = function(noteName, targetId) {
            var posInfo = parseNoteId(targetId);
            
            insertNote(noteName, posInfo.line, posInfo.num);
        }
        
        /* Export song to PDF */
        
        $scope.toImage = function(){
            html2canvas(document.getElementById('editor'), {
                  onrendered: function(canvas) {
                    var a = document.createElement('a');
                    a.download = $scope.songName + ".png";
                    a.href = canvas.toDataURL();

                    a.textContent = "Download " + a.download;
                    a.click();
                      
                  }
            });
        }
     
        /* Event: when song element is added */
        $rootScope.$on('addNote', function(event, note) {
            pushNote(note);
        });
  }])
  
  .controller('ElementsCtrl', ['$scope', '$rootScope', 'notesService', function($scope, $rootScope, notesService) {
        $scope.notes = notesService.getNotesElements();

        $scope.addNote = function(note){
            $rootScope.$broadcast('addNote', note);
        }

        $scope.enterElement = function(el){
            $rootScope.$broadcast('enterElement', el);
        }  

        $scope.leaveElement = function(el){
            $rootScope.$broadcast('leaveElement', el);
        }  
  }])

  .controller('FingeringCtrl', ['$scope', '$rootScope', 'notesService', function($scope, $rootScope, notesService) {
        $scope.contextImg = false;

        $rootScope.$on('enterElement', function(event, note) {
            $scope.contextImg = note.fingering;
        });
        
        $rootScope.$on('leaveElement', function(event, note) {
            $scope.contextImg = false;
        });
  }]);