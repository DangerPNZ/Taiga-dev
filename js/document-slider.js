'use strict';

(function () {
    var pages = document.querySelectorAll('.document-slider__word');
    var nextActiveElementIndex = null;
    var index = null;

    var getActiveElementIndex = function () {
        for (var a = 0; a < pages.length; a++) {
            if (pages[a].classList.contains('document-slider__word--active')) index = a;
        }
        return index;
    };
    var deactiveElements = function () {
        for (var j = 0; j < pages.length; j++) {
            pages[j].classList.remove('document-slider__word--active');
        }
    };
    for (var i = 0; i < pages.length; i++) {
        pages[i].addEventListener('click', function () {
            nextActiveElementIndex = getActiveElementIndex() + 1;
            deactiveElements();
            if (nextActiveElementIndex < pages.length) {
                pages[nextActiveElementIndex].classList.add('document-slider__word--active');
            } else {
                pages[0].classList.add('document-slider__word--active');
            }
        });
    }
})();