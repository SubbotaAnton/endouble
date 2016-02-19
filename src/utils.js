'use strict';

var unique = [];

function triggerEvent(eventName, payload) {
    triggerEventOnElement(document, eventName, payload);
}

function triggerEventOnElement(element, eventName, payload) {
    var event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
    event.detail = payload; // just for IE9 (we also may use polyfill && customEvent)
    element.dispatchEvent(event);
}

function getUnique() {
    var variation = 100000,
        rnd = Math.round(Math.random() * variation);
    if (unique.length >= variation) {
        return;
    }

    if (unique.indexOf(rnd) === -1) {
        unique.push(rnd);
        return rnd;
    } else {
        return getUnique();
    }
}

window.getUnique = getUnique;

export default {
    triggerEvent: triggerEvent,
    triggerEventOnElement: triggerEventOnElement,
    getUnique: getUnique
}