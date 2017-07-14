(function () {
    'use strict';
    angular
        .module('ui.blueimp.gallery', ['templates'])
        .directive('uiGallery', uiGallery);

    uiGallery.$inject = ['$window', '$templateCache'];

    function uiGallery($window, $templateCache){

        var directive = {
            template: $templateCache.get("src/ng-blueimp-gallery.html"),
            scope: {
                options: '=',
                list: '=',
                onDownload: '&'
            },
            link: link
        };
        return directive;


        function link(scope, element, attr) {
            scope.slides = scope.list;
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

            angular.element("#links").on('click', function(event){
                event = event || $window.event;
                var target = event.target || event.srcElement,
                    link = target.src ? target.parentNode : target,
                    options = {index: link, event: event},
                    links = this.getElementsByTagName('a');

                angular.extend(options, scope.options);
                
                /*
                options.onslide = function(index, slide){
                    scope.left = ((-1 * index) * (100 + 6 + 2.4)) + 'px';
                    scope.$apply();
                };
                */
                
                if(blueimp){
                    scope.gallery = blueimp.Gallery(links, options);
                }else{
                    console.log('Make sure you added blueimp-gallery.js file');
                }

            });
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