'use strict';

(function () {
    var mapPoints = $('.reserves__map-point');
    var reservesDescription = $('.reserves__reserve-item');
    var index = null;
    var newActiveElementIndex = null;
    var activeItem = null;

    var deactiveElements = function () {
            mapPoints.removeClass('reserves__map-point--active');
            reservesDescription.removeClass('reserves__reserve-item--active');
    };
    var getActiveElementIndex = function () {
        activeItem = $('.reserves__map-point--active');
        index = mapPoints.index(activeItem);
        return index;
    };
    var setActiveElements = function (index) {
        mapPoints.eq(index).addClass('reserves__map-point--active');
        reservesDescription.eq(index).addClass('reserves__reserve-item--active');
    };

    mapPoints.on('click', function () {
        deactiveElements();
        this.classList.add('reserves__map-point--active');
        reservesDescription.eq(getActiveElementIndex()).addClass('reserves__reserve-item--active');
    });
    $('.reserves__reserve-toggle-arrow--left').on('click', function () {
        newActiveElementIndex = (getActiveElementIndex() > 0) ? getActiveElementIndex() - 1 : mapPoints.length - 1;
        deactiveElements();
        setActiveElements(newActiveElementIndex);
    });
    $('.reserves__reserve-toggle-arrow--right').on('click', function () {
        newActiveElementIndex = (getActiveElementIndex() < mapPoints.length - 1) ? getActiveElementIndex() + 1 : 0;
        deactiveElements();
        setActiveElements(newActiveElementIndex);
    });
})();