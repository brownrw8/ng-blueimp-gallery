(function(){
    'use strict';

    angular
        .module('demo', ['ui.blueimp.gallery'])
        .controller('UiGalleryCtrl', UiGalleryCtrl);

    UiGalleryCtrl.$inject = ['$scope'];

    function UiGalleryCtrl($scope){
        
        $scope.list0 = [];
        $scope.list1 = [];
        $scope.list2 = [];
        $scope.list3 = [];
        $scope.list4 = [];
        
        for(var i=1;i<=5;i++){
            $scope.list2.push({
              href: 'images/image3.jpg',
              thumb: 'images/image3_thumb.jpg',
              title: i + '.png',
              selected: false
            });
        }
        
        for(var i=1;i<=51;i++){
            $scope.list0.push({
              href: 'images/image1.jpg',
              thumb: 'images/image1_thumb.jpg',
              title: i + '.png',
              selected: false
            });
        }
        
        for(var i=1;i<=501;i++){
            $scope.list4.push({
              href: 'images/image2.jpg',
              thumb: 'images/image2_thumb.jpg',
              title: i + '.png',
              selected: false
            });
        }

    /*
        $scope.list = [
            {
              href: 'images/image1.jpg',
              thumb: 'images/image1_thumb.jpg',
              title: '1.png',
              selected: false
            },
            {
              href: 'images/image2.jpg',
              thumb: 'images/image2_thumb.jpg',
              title: '2.png',
              selected: false
            },
            {
              href: 'images/image3.jpg',
              thumb: 'images/image3_thumb.jpg',
              title: '3.png',
              selected: false
            },
            {
              href: 'images/image4.jpg',
              thumb: 'images/image4_thumb.jpg',
              title: '3.png',
              selected: false
            },
            {
              href: 'images/image1.jpg',
              thumb: 'images/image1_thumb.jpg',
              title: '1.png',
              selected: false
            },
            {
              href: 'images/image2.jpg',
              thumb: 'images/image2_thumb.jpg',
              title: '2.png',
              selected: false
            },
            {
              href: 'images/image3.jpg',
              thumb: 'images/image3_thumb.jpg',
              title: '3.png',
              selected: false
            },
            {
              href: 'images/image4.jpg',
              thumb: 'images/image4_thumb.jpg',
              title: '3.png',
              selected: false
            }
        ];
    */
        
        $scope.download = function(items){
            for(var i in items){
               console.log('Downloading', items[i]); 
            }
        }
        

    }

})();