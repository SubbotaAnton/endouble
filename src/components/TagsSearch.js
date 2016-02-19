'use strict';
import actionTypes from './../types/actionTypes';
import storeTypes from './../types/storesTypes';
import SearchFilterStore from './../stores/SearchFilterStore';
import utils from './../utils';

export default class TagsSearch {
    constructor (wrapper, unique) {
        this.wrapper = wrapper;
        this.container = null;
        this.unique = unique;
        this.init();
    }

    init () {
        this.classContainer = 'tagContainer';
        this.classContainerItem = this.classContainer + '-item';
        this.classContainerClose = this.classContainer + '-close';

        this.renderHTML();
        this.watchStore();
        this.handleEvent();
    }

    renderHTML() {
        var container = document.createElement('div');
        container.className = this.classContainer;
        this.wrapper.appendChild(container);
        this.container = container;
    }

    watchStore () {
        document.addEventListener(storeTypes.STORE_SEARCH_UPDATE + this.unique, this.storeUpdated.bind(this));
    }

    storeUpdated (event) {
        var data = event.detail;

        this.container.innerHTML = '';
        Object.keys(data).forEach(key => {
            data[key].forEach(value => {
                let el, elClose;
                el = document.createElement('span');
                el.textContent = value;
                el.className = this.classContainerItem;
                el.setAttribute('data-name', key);
                el.setAttribute('data-value', value);
                elClose = document.createElement('span');
                elClose.textContent = "X";
                elClose.className = this.classContainerClose;
                el.appendChild(elClose);
                this.container.appendChild(el);
            });
        });

    }

    handleEvent () {
        this.container.addEventListener('click', event => {
            var el = event.target;

            if (el.className === this.classContainerClose) {
                el.parentNode.remove();
            }

            utils.triggerEvent(actionTypes.SEARCH_FILTER_UPDATE + this.unique, this.getData());
        });
    }

    getData () {
        var data = {};

        Array.prototype.forEach.call(this.wrapper.getElementsByClassName(this.classContainerItem), tag => {
            var name = tag.getAttribute('data-name'),
                value = tag.getAttribute('data-value');

            data[name] = data[name] || [];
            data[name].push(value);
        });

        return data;
    }

}