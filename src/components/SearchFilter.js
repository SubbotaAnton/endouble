'use strict';

import SearchFilterStore from './../stores/SearchFilterStore';
import TagsSearch from './TagsSearch';
import Select from './Select';
import actionTypes from './../types/actionTypes';
import storeTypes from './../types/storesTypes';
import utils from './../utils';

export default class SearchFilter {
    constructor (wrapper) {
        this.wrapper = wrapper;
        this.unique = utils.getUnique();
        this.tag = new TagsSearch(wrapper, this.unique);
        this.store = new SearchFilterStore(this.unique); // it's good only for this small project
        this.init();
    }

    init () {
        this.queryElements = 'select';
        this.replaceSelects();
        this.watchStore();
        utils.triggerEvent(actionTypes.SEARCH_FILTER_UPDATE + this.unique, this.getData());
        this.handleEvent();
    }

    replaceSelects () {
        // we may use native selects for some mobile devices - just disable this function
        Array.prototype.forEach.call(this.wrapper.querySelectorAll('select'), select => {
            new Select(select, this.unique);
        });
    }

    watchStore () {
        document.addEventListener(storeTypes.STORE_SEARCH_UPDATE + this.unique, this.storeUpdated.bind(this));
    }

    storeUpdated (event) {
        var data = event.detail;

        Array.prototype.forEach.call(this.wrapper.querySelectorAll('option'), option => {
            option.removeAttribute('selected');
            option.selected = false;
        });

        Object.keys(data).forEach(name => {
            Array.prototype.forEach.call(this.wrapper.querySelectorAll('[name="' + name + '"] option'), option => {
                if (data[name].indexOf(option.value) !== -1) {
                    option.setAttribute('selected', 'selected');
                    option.selected = true;
                }
            });
        });
    }

    getData () {
        var data = {};

        Array.prototype.forEach.call(this.wrapper.querySelectorAll(this.queryElements), el => {
            data[el.name] = this.getSelectValues(el);
        });

        return data;
        // we should have action for this purpose (like in Flux pattern) but we may do it easier
    }

    getSelectValues (el) {
        var result = [];
        Array.prototype.forEach.call((el.selectedOptions), el => result.push(el.value));
        return result;
    }

    handleEvent () {
        this.wrapper.addEventListener('change', event => {
            var el = event.target;

            if (el.tagName.toLowerCase() === 'select') {
                utils.triggerEvent(actionTypes.SEARCH_FILTER_UPDATE + this.unique, this.getData());
            }

            event.preventDefault();
        });
    }
}