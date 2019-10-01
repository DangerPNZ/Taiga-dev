'use strict';

(function () {
    var SLIDER_WIDTH = null;
    var slide2 = document.querySelector('.slider-after-before__slide-forest--2');
    var delimiter = document.querySelector('.slider-after-before__delimeter');
    var DELIMITER_WIDTH = parseInt(getComputedStyle(delimiter).width, 10);
    var PIN_X_MIN = 0;
    var PIN_X_MAX;
    var setParameters = function () {
        SLIDER_WIDTH = document.querySelector('.article-item--active').clientWidth;
        PIN_X_MAX = SLIDER_WIDTH - DELIMITER_WIDTH;
    };
    var onDragStart = function(device) {
        return function (event) {
            event.preventDefault();
    
            var startCoords = {
                x: window.global.defineClientXObject(device, event)
            };
    
            var onDragMove = function (moveEvt) {
                var shift = {
                    x: startCoords.x - window.global.defineClientXObject(device, moveEvt)
                };
    
                var currentX = delimiter.offsetLeft - shift.x;
                if (currentX >= PIN_X_MIN && currentX <= PIN_X_MAX) {
                    startCoords = {
                        x: window.global.defineClientXObject(device, moveEvt)
                    };
                    delimiter.style.left = (currentX / SLIDER_WIDTH) * 100 + '%';
                    slide2.style.width = ((SLIDER_WIDTH - currentX) / SLIDER_WIDTH) * 100 + '%';
                    slide2.style.left = delimiter.style.left;
                }
            };
    
            var onDragEnd = function (upEvt) {
                upEvt.preventDefault();
                document.removeEventListener(window.global.defineEventTypes(device, 'move'), onDragMove);
                document.removeEventListener(window.global.defineEventTypes(device, 'dragend'), onDragEnd);
            };
    
            document.addEventListener(window.global.defineEventTypes(device, 'move'), onDragMove);
            document.addEventListener(window.global.defineEventTypes(device, 'dragend'), onDragEnd);
        }
    }
    setParameters();
    window.addEventListener('resize', setParameters);


    delimiter.addEventListener('mousedown', onDragStart('desktop'));
    delimiter.addEventListener('touchstart', onDragStart('mobile'));
})();