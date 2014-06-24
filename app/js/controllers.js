'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('SongCtrl', ['$scope', function($scope) {

  }])
  .controller('ElementsCtrl', ['$scope', function($scope) {
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
              ,{name: 'accent', title: 'Accent', file: 'accent.png'}
              ,{name: 'beat', title: 'Beat', file: 'beat.png'}
              ,{name: 'bar', title: 'Bar', file: 'bar.png'}
          ]
  }]);
