'use strict';

window.global = {
    clientXObject: null,
    defineClientXObject: function (deviceType, event) {
        if (deviceType === 'desktop') {
            this.clientXObject = event.clientX;
        } else if (deviceType === 'mobile') {
            this.clientXObject = event.changedTouches[0].clientX;
        }
        return this.clientXObject;
    },
    eventName: null,  
    defineEventTypes: function (deviceType, eventType) {
        if (deviceType === 'desktop' && eventType === 'move') {
            this.eventName = 'mousemove';
        } else if (deviceType === 'desktop' && eventType === 'dragend') {
            this.eventName = 'mouseup';
        } else if (deviceType === 'mobile' && eventType === 'move') {
            this.eventName = 'touchmove';
        } else if (deviceType === 'mobile' && eventType === 'dragend') {
            this.eventName = 'touchend';
        }
        return this.eventName;
    }
}