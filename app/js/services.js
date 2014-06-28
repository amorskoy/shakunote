'use strict';

/* Services */

angular.module('myApp.services', [])

        .service('notesService', function() {
            var notes = {
                pre_meri: {name: 'pre_meri', title: 'Pre meri', file: 'pre meri.png'}
                ,newline: {name: 'newline', title: 'Newline', file: 'new line.png'}
                ,accent: {name: 'accent', title: 'Accent', file: 'accent.png'}
                ,beat: {name: 'beat', title: 'Beat', file: 'beat.png'}
                ,bar: {name: 'bar', title: 'Bar', file: 'bar.png'}
                ,ro_meri: {name: 'ro_meri', title: 'RO meri', file: 'ro meri.png'}
                ,ro_dai_meri: {name: 'ro_dai_meri', title: 'RO dai meri', file: 'ro dai meri.png'}
                ,ro: {name: 'ro', title: 'RO', file: 'ro.png'}
                ,tsu_chu_meri: {name: 'tsu_chu_meri', title: 'TSU chu meri', file: 'tsu chu meri.png'}
                ,tsu_meri: {name: 'tsu_meri', title: 'TSU meri', file: 'tsu meri.png'}
                ,tsu: {name: 'tsu', title: 'TSU', file: 'tsu.png'}
                ,re: {name: 're', title: 'RE', file: 're.png'}
                ,u_meri: {name: 'u_meri', title: 'U meri', file: 'u meri.png'}
                ,u: {name: 'u', title: 'U', file: 'u.png'}
                ,ha: {name: 'ha', title: 'HA', file: 'ha.png'}
                ,ha_meri: {name: 'ha_meri', title: 'HA meri', file: 'ha meri.png'}
                ,ha_chu_meri: {name: 'ha_chu_meri', title: 'HA chu meri', file: 'ha chu meri.png'}
                ,hi: {name: 'hi', title: 'HI', file: 'hi.png'}
            };

            this.getNotesElements = function() {
                return notes;
            }
            
            this.getNote = function(name){
                return (notes[name]!=undefined) ? notes[name] : false;
            }
        });
