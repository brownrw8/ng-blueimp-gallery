(function(){
    'use strict';

    angular
        .module('demo', ['ui.blueimp.gallery'])
        .controller('UiGalleryCtrl', UiGalleryCtrl);

    UiGalleryCtrl.$inject = ['$scope'];

    function UiGalleryCtrl($scope){

        $scope.list = [
            {
              href: 'images/1.png',
              thumb: 'images/1.png',
              title: '1.png',
              selected: false
            },
            {
              href: 'images/2.png',
              thumb: 'images/2.png',
              title: '2.png',
              selected: false
            },
            {
              href: 'images/3.png',
              thumb: 'images/3.png',
              title: '3.png',
              selected: false
            },
            {
              href: 'images/4.png',
              thumb: 'images/4.png',
              title: '3.png',
              selected: false
            },
            {
              href: 'images/5.png',
              thumb: 'images/5.png',
              title: '5.png',
              selected: false
            },
            {
              href: 'images/6.png',
              thumb: 'images/6.png',
              title: '6.png',
              selected: false
            },
            {
              href: 'images/7.png',
              thumb: 'images/7.png',
              title: '7.png',
              selected: false
            },
            {
              href: 'images/8.png',
              thumb: 'images/8.png',
              title: '8.png',
              selected: false
            },
            {
              href: 'images/9.png',
              thumb: 'images/9.png',
              title: '9.png',
              selected: false
            },
            {
              href: 'images/10.png',
              thumb: 'images/10.png',
              title: '10.png',
              selected: false
            },
        ];
        
        $scope.download = function(items){
            for(var i in items){
               console.log('Downloading', items[i]); 
            }
        }
        

    }

})();