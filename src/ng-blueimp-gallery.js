(function () {
    'use strict';
    angular
        .module('ui.blueimp.gallery', [])
        .directive('uiGallery', uiGallery);

    uiGallery.$inject = ['$window'];

    function uiGallery($window){

        var directive = {
            templateUrl: '/src/ng-blueimp-gallery.html',
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

    /*
    angular
        .module("ui.blueimp.gallery.templates", [])
        .run(uiGalleryTemplate);


    uiGalleryTemplate.$inject = ['$templateCache'];

    function uiGalleryTemplate($templateCache){
        $templateCache.put("gallery.html","<div id=\"blueimp-gallery\" class=\"blueimp-gallery blueimp-gallery-controls\">\n <div class=\"slides\"></div>\n <h3 class=\"title\"></h3>\n <a class=\"prev\">‹</a>\n <a class=\"next\">›</a>\n <a class=\"close\">×</a>\n <a class=\"play-pause\"></a>\n <ol class=\"indicator\">\n <li ng-repeat=\"slide in slides\" title=\"{{slide.title}}\" data-index=\"{{$index}}\" style=\"background-image: url({{slide.thumb}})\"></li>\n </ol>\n </div>\n\n <div id=\"links\" class=\"links blueimp-gallery-inner\">\n  <a ng-repeat=\"slide in slides\" href=\"{{slide.href}}\" title=\"{{slide.title}}\" data-index=\"{{$index}}\">\n    <img ng-src=\"{{slide.thumb}}\" alt=\"{{slide.title}}\">\n  </a>\n</div>\n");
    }
    */

})();
