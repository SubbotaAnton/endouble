'use strict';

import actionTypes from '../types/actionTypes';
import storeTypes from '../types/storesTypes';
import utils from '../utils';

export default class SearchFilterStore {
    constructor (unique) {
        this.state = {};
        this.unique = unique;
        this.init();
    }

    init () {
        document.addEventListener(actionTypes.SEARCH_FILTER_UPDATE + this.unique, this.searchFilterUpdate.bind(this)); // very simple event listener
        // and other events
    }

    searchFilterUpdate (payload) {
        this.updateStore(payload.detail);
    }

    updateStore (payload) {
        var event = document.createEvent('Event');

        if (JSON.stringify(payload) === this.lastStateHash) {
            return;
        }

        this.state = Object.assign({}, payload);
        this.lastStateHash = JSON.stringify(this.state);

        utils.triggerEvent(storeTypes.STORE_SEARCH_UPDATE + this.unique, this.state);
        // it's not elegantly but for this small project we may use this approach

    }

}