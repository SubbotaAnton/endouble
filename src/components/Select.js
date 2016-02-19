'use strict';

import utils from './../utils';
import storeTypes from './../types/storesTypes';

export default class Select {
    constructor (nativeWrapper, unique) {
        this.nativeWrapper = nativeWrapper;
        this.pseudoWrapper = null;
        this.pseudoList = null;
        this.pseudoResult = null;
        this.unique = unique;
        this.init();
    }

    init () {
        this.classContainer = 'selectContainer';
        this.classContainerList = this.classContainer + '-list';
        this.classContainerItem = this.classContainer + '-item';
        this.classContainerResult = this.classContainer + '-result';
        this.classContainerArrow = this.classContainer + '-arrow';

        this.nativeWrapper.style.display = 'none';
        this.createPseudoSelect();
        this.handlers();
        this.watchStore();
    }

    watchStore () {
        document.addEventListener(storeTypes.STORE_SEARCH_UPDATE + this.unique, this.storeUpdated.bind(this));
    }

    storeUpdated () {
        var data = event.detail;
        Array.prototype.forEach.call(this.pseudoWrapper.querySelectorAll('li'), li => {
            li.removeAttribute('data-selected');
        });

        Object.keys(data).forEach(name => {
            Array.prototype.forEach.call(this.pseudoWrapper.querySelectorAll('[name="' + name + '"] li'), li => {
                if (data[name].indexOf(li.textContent) !== -1) {
                    li.setAttribute('data-selected', 'selected');
                }
            });
        });

        this.updateResult();
    }

    createPseudoSelect () {
        var maxWidth,
            arrow;

        // react with 'render' will be usefull here...
        this.pseudoWrapper = document.createElement('div');
        this.pseudoWrapper.className = this.classContainer;

        this.pseudoResult = document.createElement('div');
        this.pseudoResult.className = this.classContainerResult;

        arrow = document.createElement('div');
        arrow.className = this.classContainerArrow;
        arrow.textContent = '>';
        this.pseudoResult.appendChild(arrow);

        this.pseudoWrapper.appendChild(this.pseudoResult);

        this.pseudoList = document.createElement('ul');
        this.pseudoList.className = this.classContainerList;
        this.pseudoList.setAttribute('name', this.nativeWrapper.getAttribute('name'));
        if (this.nativeWrapper.getAttribute('multiple') !== null) {
            this.pseudoList.setAttribute('multiple', 'multiple');
        }
        this.pseudoList.setAttribute('placeholder', this.nativeWrapper.getAttribute('placeholder') || 'Select plz');

        Array.prototype.forEach.call(this.nativeWrapper.querySelectorAll('option'), option => {
            var item = document.createElement('li'),
                isOptionSelected = option.hasAttribute('selected');

            item.className = this.classContainerItem;
            item.textContent = option.textContent;
            isOptionSelected && item.setAttribute('data-selected', 'selected');

            this.pseudoList.appendChild(item);
        });

        this.pseudoWrapper.appendChild(this.pseudoList);
        this.nativeWrapper.parentNode.insertBefore(this.pseudoWrapper, this.nativeWrapper);
        this.updateResult();
        maxWidth = this.pseudoList.offsetWidth > this.pseudoResult.offsetWidth ?
            this.pseudoList.offsetWidth : this.pseudoResult.offsetWidth;
        this.pseudoList.style.minWidth = maxWidth + 'px';
        this.pseudoResult.style.minWidth = maxWidth + 'px';
        this.pseudoList.style.display = 'none';
    }

    handlers () {
        document.addEventListener('click', event => {
            var el = event.target,
                isInside = false;

            while (el && el !== document) {
                if (el === this.pseudoWrapper) {
                    isInside = true;
                }
                el = el.parentNode;
            }
            if (!isInside) {
                this.pseudoList.style.display = 'none';
            }
        });

        this.pseudoResult.addEventListener('click', event => {
            if (this.pseudoList.style.display === 'none') {
                this.pseudoList.style.display = 'block';
            } else {
                this.pseudoList.style.display = 'none';
            }
        });

        this.pseudoList.addEventListener('click', event => {
            var el = event.target,
                ctrlMode = false,
                isMultiple = this.pseudoList.getAttribute('multiple') !== null;

            if (isMultiple && (event.ctrlKey || event.metaKey)) { // click with ctrl or Cmd
                ctrlMode = true;
            }

            if (el.tagName.toLowerCase() === 'li') {
                let nodePseudoList = Array.prototype.slice.call(this.pseudoList.children),
                    elIndex = nodePseudoList.indexOf(el),
                    option = this.nativeWrapper.children[elIndex];

                if (!ctrlMode) {
                    Array.prototype.forEach.call(this.nativeWrapper.children, option => {
                        option.removeAttribute('selected');
                        option.selected = false;
                    });
                }

                if (option.getAttribute('selected') !== 'selected') {
                    option.setAttribute('selected', 'selected');
                    option.selected = true;
                } else if (ctrlMode) { // we may delete the last one only with Ctrl/Command
                    option.removeAttribute('selected');
                    option.selected = false;
                }

                if (!isMultiple) {
                    this.pseudoList.style.display = 'none';
                }

                this.updateResult();

                utils.triggerEventOnElement(this.nativeWrapper, 'change');
            }
        });
    }

    updateResult () {
        // it's impossible for native non-multiple select haven't value
        // we can't set empty value for select in browser
        // that's why I decide to transfer this behavior to pseudoselect
        // in the video for this task you may set empty state for non-multiple select
        // but in the case of my project you can't do it
        // if we really need this behavior we can do it, but there is no analogues among native selects

        var count = 0,
            result = this.pseudoList.getAttribute('placeholder'),
            isTextNodeExist = false;

        Array.prototype.forEach.call(this.pseudoList.children, li => {
            if (li.getAttribute('data-selected') === 'selected') {
                result = li.textContent;
                count++;
            }
        });

        if (count > 1 ) {
            result = count + ' results';
        }

        Array.prototype.forEach.call(this.pseudoResult.childNodes, node => {
            if (node.nodeType === 3) {
                isTextNodeExist = true;
                node.textContent = result;
            }
        });

        if (!isTextNodeExist) {
            result = document.createTextNode(result);
            this.pseudoResult.appendChild(result);
        }

    }

}