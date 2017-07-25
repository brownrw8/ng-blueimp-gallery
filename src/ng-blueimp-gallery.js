(function () {
    'use strict';
    
    angular.module('templates',[]);

    angular
        .module('ui.blueimp.gallery', ['templates'])
        .directive('uiGallery', uiGallery);

    uiGallery.$inject = ['$window', '$templateCache'];

    function uiGallery($window, $templateCache){

        var directive = {
            template: $templateCache.get("src/ng-blueimp-gallery.html"),
            scope: {
                list: '=',
                onDownload: '&'
            },
            link: link
        };
        return directive;


        function link(scope, element, attr) {
            scope.id = "blueimp-gallery-" +  Math.floor(Math.random() * 200) + Date.now();
            scope.slides = scope.list;
            scope.count = scope.list.length;
            scope.isSelectAll = false;
            
            //scope.left = '100px';

            
            scope.$watch('list', function(newVal, oldVal){
                scope.slides = newVal;
            });
            
            scope.setActiveSlide = function($index){
                if(scope.gallery.getIndex()!==$index){
                    scope.gallery.slide($index);
                }
            };
            
            scope.selectSlide = function($index){
                scope.list[$index].selected = !scope.list[$index].selected;
                
            };
            
            scope.selectAll = function(){
                if(scope.isSelectAll) {
                    scope.isSelectAll = false;
                    for(var item in scope.list){
                        var current = scope.list[item];
                        current.selected = false;
                    }
                }else {
                    scope.isSelectAll = true
                    for(var item in scope.list){
                        var current = scope.list[item];
                        current.selected = true;
                    }
                }
            };
            
            scope.downloadSelected = function(){
                var items = [];
                for(var item in scope.list){
                    var current = scope.list[item];
                    if(current.selected){
                        console.log('Queued For Download', current);
                        items.push(current);
                    }
                }
                scope.onDownload()(items);
            };

            scope.view = function($event){
                var target = $event.target || $event.srcElement,
                    options = {index: 0, event: $event, container: '#'+scope.id},
                    links = angular.element(target).parent().get(0).getElementsByTagName('a');
               
                /*
                options.onslide = function(index, slide){
                    scope.left = ((-1 * index) * (100 + 6 + 2.4)) + 'px';
                    scope.$apply();
                };
                */
                
                if(blueimp){
                    scope.gallery = blueimp.Gallery(links, options);
                }else{
                    console.log('Ensure you have included blueimp-gallery.js');
                }

            };
        }
    }
    
    angular 
    .module('ui.blueimp.gallery')
    .directive('stopEvent', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if(attr && attr.stopEvent)
                    element.bind(attr.stopEvent, function (e) {
                        e.stopPropagation();
                    });
            }
        };
     });

})();
