'use strict';

(function () {
    var descriptions = $('.animals-game__event-description');

    var DROPZONE_TO_ANIMAL = {
        'tree': 'bird',
        'lake': 'frog',
        'forest': 'lynx'
    };
    $('#bird, #frog, #lynx').draggable({
        containment: '.animals-game',
        revert: true,
        revertDuration: 300
    });
    var doDroppable = function(place) {
        $('#' + place).droppable({
            accept: '#' + DROPZONE_TO_ANIMAL[place],
            drop: function (event, ui) {
                $(this).append(ui.draggable);
                $(this).addClass('animals-game__drop-area--complete');
                descriptions.removeClass('animals-game__event-description--show');
                $('.animals-game__event-description[data-id="' + place + '"]').addClass('animals-game__event-description--show');
            }
        });
    };

    doDroppable('lake');
    doDroppable('forest');
    doDroppable('tree');

    // ПЕРВЫЙ ВАРИАНТ НА ЧИСТОМ JS

    // var animalsArea = document.querySelector('.animals-game__animals');
    // var dropAreas = document.querySelectorAll('.animals-game__drop-area');
    // var descriptions = document.querySelectorAll('.animals-game__event-description');
    // var draggedItem = null;
    // var dropZoneId = null;
    // var dropZone = null;
    //
    // var DragLeaveAnimalHandler = function (event) {
    //     event.preventDefault();
    //     event.target.style.backgroundColor = '';
    //     event.target.style.borderColor = '';
    //     dropZone = null;
    // };
    // var DragEnterAnimalHandler = function (event) {
    //     event.preventDefault();
    //     event.target.style.backgroundColor = '';
    //     event.target.style.borderColor = '';
    // };
    // var DropAnimalHandler = function (event) {
    //     dropZone = event.currentTarget;
    //     dropZoneId = event.currentTarget.getAttribute('id');
    //     if (draggedItem.getAttribute('data-dropzone') === dropZoneId) {
    //         event.target.style.backgroundColor = 'rgba(86, 224, 76, 0.2)';
    //         event.target.style.borderColor = '#2fa326';
    //         event.target.appendChild(draggedItem);
    //         hideDescriptions();
    //         setDescription(dropZoneId);
    //         dropZone.removeEventListener('dragleave', DragLeaveAnimalHandler);
    //         dropZone.removeEventListener('dragenter', DragEnterAnimalHandler);
    //         dropZone.removeEventListener('drop', DropAnimalHandler);
    //     }
    // };
    // var hideDescriptions = function () {
    //     for (var j = 0; j < descriptions.length; j++) {
    //         descriptions[j].classList.remove('animals-game__event-description--show');
    //     }
    // };
    // var setDescription = function (id) {
    //     for (var a = 0; a < descriptions.length; a++) {
    //         if (descriptions[a].getAttribute('data-id') === id) {
    //             descriptions[a].classList.add('animals-game__event-description--show');
    //         }
    //     }
    // };
    //
    // animalsArea.addEventListener('dragstart', function (event) {
    //     if (event.target.getAttribute('id') === 'bird' || event.target.getAttribute('id') === 'frog' || event.target.getAttribute('id') === 'lynx') {
    //         draggedItem = event.target;
    //         event.dataTransfer.setData('text', event.target.alt);
    //         dropZone = document.querySelector('#' + event.target.getAttribute('data-dropzone'));
    //     }
    // });
    // for (var i = 0; i < dropAreas.length; i++) {
    //     dropAreas[i].addEventListener('dragover', function (event) {
    //         event.preventDefault();
    //         return false;
    //     });
    //     dropAreas[i].addEventListener('drop', DropAnimalHandler);
    //     dropAreas[i].addEventListener('dragenter', DragEnterAnimalHandler);
    //     dropAreas[i].addEventListener('dragleave', DragLeaveAnimalHandler);
    // }
})();