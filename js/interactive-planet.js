'use strict';

(function () {
    var RANGE_WIDTH = null;
    var PIN_X_MIN = 0;
    var PIN_X_MAX = null;
    var TOTAL_FRAMES = 66;
    var FRAME_SHANGE_STEP;
    var planetImg = document.querySelector('.interactive-planet__planet-picture img');
    var rangeCompleteBar = document.querySelector('.interactive-planet__range-scale');
    var pin = document.querySelector('.interactive-planet__range-pin');
    var frame = null;
    var currentFrame = null;
    var slideContainingInteractivePlanet = document.querySelector('.articles__dot--planet');
    var setParameters = function () {
        if(slideContainingInteractivePlanet.classList.contains('articles__dot--active')) {
            RANGE_WIDTH = parseInt(getComputedStyle(document.querySelector('.interactive-planet__range')).width, 10);
            PIN_X_MAX = RANGE_WIDTH;
            FRAME_SHANGE_STEP = RANGE_WIDTH / TOTAL_FRAMES;
        }
    };
    var precacheFrames = function () {
        for (var i = 1; i <= TOTAL_FRAMES; i++) {
            if (i < 10) {
                document.createElement('img').setAttribute('src', 'img/planet-slides/article-taiga-1-frame_' + '0' + i + '.png');
            } else {
                document.createElement('img').setAttribute('src', 'img/planet-slides/article-taiga-1-frame_' + i + '.png');
            }
        }
    };  
    var getCurrentFrame = function () {
        if (Math.floor(parseInt(getComputedStyle(pin).left, 10) / FRAME_SHANGE_STEP) > 1) {
            frame = Math.floor(parseInt(getComputedStyle(pin).left, 10) / FRAME_SHANGE_STEP);
        } else {
            frame = 1;
        }
        if (frame < 10) {
            currentFrame = '0' + frame;
        } else {
            currentFrame = frame;
        }
        return currentFrame;
    };
    var setPlanetFrame = function (numberPhoto) {
        planetImg.setAttribute('src', 'img/planet-slides/article-taiga-1-frame_' + numberPhoto + '.png');
    };

    setParameters();
    slideContainingInteractivePlanet.addEventListener('click', setParameters);
    window.addEventListener('resize', setParameters);
    window.addEventListener('orientationchange', setParameters);
    precacheFrames();
    setPlanetFrame(getCurrentFrame());

    var onDragStart = function (device) {
        return function (event) {
            event.preventDefault();
            var startCoords = {
                x: window.global.defineClientXObject(device, event)
            };

            var onDragMove = function (moveEvt) {
                var shift = {
                    x: startCoords.x - window.global.defineClientXObject(device, moveEvt)
                };
                var currentX = pin.offsetLeft - shift.x;
                if (currentX >= PIN_X_MIN && currentX <= PIN_X_MAX) {
                    startCoords = {
                        x: window.global.defineClientXObject(device, moveEvt)
                    };
                    pin.style.left = (currentX / RANGE_WIDTH) * 100 + '%';
                    rangeCompleteBar.style.width = pin.style.left;
                    setPlanetFrame(getCurrentFrame());
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

    pin.addEventListener('mousedown', onDragStart('desktop'));
    pin.addEventListener('touchstart', onDragStart('mobile'));
})();