'use strict';

(function () {
    $('.interactive-tv__power-btn').on('click', function(event) {
        event.preventDefault();
        $('.interactive-tv').toggleClass('interactive-tv--on');
    });
})();