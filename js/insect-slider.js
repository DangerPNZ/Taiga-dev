'use strict';

(function () {
    var insects = document.querySelectorAll('.insect-slider__insect-swarm');
    var subjectToExtinction = insects.length - 1;
    var aerosol = document.querySelector('.insect-slider__aerosol');

    aerosol.addEventListener('click', function (event) {
        if (subjectToExtinction >= 0) {
            insects[subjectToExtinction].classList.add('insect-slider__insect-swarm--hide');
            --subjectToExtinction;
        } else {
            event.currentTarget.style.display = 'none';
            insects[Math.floor(Math.random() * insects.length)].classList.remove('insect-slider__insect-swarm--hide');
        }
    })
})();