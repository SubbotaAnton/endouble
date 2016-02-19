var endouble =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _SearchFilter = __webpack_require__(8);
	
	var _SearchFilter2 = _interopRequireDefault(_SearchFilter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var filterQuery = '[data-type="searchFilter"]';
	var filters = [];
	
	Array.prototype.forEach.call(document.querySelectorAll(filterQuery), function (el) {
	    filters.push(new _SearchFilter2.default(el));
	});

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _actionTypes = __webpack_require__(11);
	
	var _actionTypes2 = _interopRequireDefault(_actionTypes);
	
	var _storesTypes = __webpack_require__(12);
	
	var _storesTypes2 = _interopRequireDefault(_storesTypes);
	
	var _utils = __webpack_require__(4);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SearchFilterStore = function () {
	    function SearchFilterStore(unique) {
	        _classCallCheck(this, SearchFilterStore);
	
	        this.state = {};
	        this.unique = unique;
	        this.init();
	    }
	
	    _createClass(SearchFilterStore, [{
	        key: 'init',
	        value: function init() {
	            document.addEventListener(_actionTypes2.default.SEARCH_FILTER_UPDATE + this.unique, this.searchFilterUpdate.bind(this)); // very simple event listener
	            // and other events
	        }
	    }, {
	        key: 'searchFilterUpdate',
	        value: function searchFilterUpdate(payload) {
	            this.updateStore(payload.detail);
	        }
	    }, {
	        key: 'updateStore',
	        value: function updateStore(payload) {
	            var event = document.createEvent('Event');
	
	            if (JSON.stringify(payload) === this.lastStateHash) {
	                return;
	            }
	
	            this.state = Object.assign({}, payload);
	            this.lastStateHash = JSON.stringify(this.state);
	
	            _utils2.default.triggerEvent(_storesTypes2.default.STORE_SEARCH_UPDATE + this.unique, this.state);
	            // it's not elegantly but for this small project we may use this approach
	        }
	    }]);
	
	    return SearchFilterStore;
	}();

	exports.default = SearchFilterStore;

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
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
	
	exports.default = {
	    triggerEvent: triggerEvent,
	    triggerEventOnElement: triggerEventOnElement,
	    getUnique: getUnique
	};

/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _SearchFilterStore = __webpack_require__(2);
	
	var _SearchFilterStore2 = _interopRequireDefault(_SearchFilterStore);
	
	var _TagsSearch = __webpack_require__(9);
	
	var _TagsSearch2 = _interopRequireDefault(_TagsSearch);
	
	var _Select = __webpack_require__(10);
	
	var _Select2 = _interopRequireDefault(_Select);
	
	var _actionTypes = __webpack_require__(11);
	
	var _actionTypes2 = _interopRequireDefault(_actionTypes);
	
	var _storesTypes = __webpack_require__(12);
	
	var _storesTypes2 = _interopRequireDefault(_storesTypes);
	
	var _utils = __webpack_require__(4);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SearchFilter = function () {
	    function SearchFilter(wrapper) {
	        _classCallCheck(this, SearchFilter);
	
	        this.wrapper = wrapper;
	        this.unique = _utils2.default.getUnique();
	        this.tag = new _TagsSearch2.default(wrapper, this.unique);
	        this.store = new _SearchFilterStore2.default(this.unique); // it's good only for this small project
	        this.init();
	    }
	
	    _createClass(SearchFilter, [{
	        key: 'init',
	        value: function init() {
	            this.queryElements = 'select';
	            this.replaceSelects();
	            this.watchStore();
	            _utils2.default.triggerEvent(_actionTypes2.default.SEARCH_FILTER_UPDATE + this.unique, this.getData());
	            this.handleEvent();
	        }
	    }, {
	        key: 'replaceSelects',
	        value: function replaceSelects() {
	            var _this = this;
	
	            // we may use native selects for some mobile devices - just disable this function
	            Array.prototype.forEach.call(this.wrapper.querySelectorAll('select'), function (select) {
	                new _Select2.default(select, _this.unique);
	            });
	        }
	    }, {
	        key: 'watchStore',
	        value: function watchStore() {
	            document.addEventListener(_storesTypes2.default.STORE_SEARCH_UPDATE + this.unique, this.storeUpdated.bind(this));
	        }
	    }, {
	        key: 'storeUpdated',
	        value: function storeUpdated(event) {
	            var _this2 = this;
	
	            var data = event.detail;
	
	            Array.prototype.forEach.call(this.wrapper.querySelectorAll('option'), function (option) {
	                option.removeAttribute('selected');
	                option.selected = false;
	            });
	
	            Object.keys(data).forEach(function (name) {
	                Array.prototype.forEach.call(_this2.wrapper.querySelectorAll('[name="' + name + '"] option'), function (option) {
	                    if (data[name].indexOf(option.value) !== -1) {
	                        option.setAttribute('selected', 'selected');
	                        option.selected = true;
	                    }
	                });
	            });
	        }
	    }, {
	        key: 'getData',
	        value: function getData() {
	            var _this3 = this;
	
	            var data = {};
	
	            Array.prototype.forEach.call(this.wrapper.querySelectorAll(this.queryElements), function (el) {
	                data[el.name] = _this3.getSelectValues(el);
	            });
	
	            return data;
	            // we should have action for this purpose (like in Flux pattern) but we may do it easier
	        }
	    }, {
	        key: 'getSelectValues',
	        value: function getSelectValues(el) {
	            var result = [];
	            Array.prototype.forEach.call(el.selectedOptions, function (el) {
	                return result.push(el.value);
	            });
	            return result;
	        }
	    }, {
	        key: 'handleEvent',
	        value: function handleEvent() {
	            var _this4 = this;
	
	            this.wrapper.addEventListener('change', function (event) {
	                var el = event.target;
	
	                if (el.tagName.toLowerCase() === 'select') {
	                    _utils2.default.triggerEvent(_actionTypes2.default.SEARCH_FILTER_UPDATE + _this4.unique, _this4.getData());
	                }
	
	                event.preventDefault();
	            });
	        }
	    }]);
	
	    return SearchFilter;
	}();

	exports.default = SearchFilter;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _actionTypes = __webpack_require__(11);
	
	var _actionTypes2 = _interopRequireDefault(_actionTypes);
	
	var _storesTypes = __webpack_require__(12);
	
	var _storesTypes2 = _interopRequireDefault(_storesTypes);
	
	var _SearchFilterStore = __webpack_require__(2);
	
	var _SearchFilterStore2 = _interopRequireDefault(_SearchFilterStore);
	
	var _utils = __webpack_require__(4);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TagsSearch = function () {
	    function TagsSearch(wrapper, unique) {
	        _classCallCheck(this, TagsSearch);
	
	        this.wrapper = wrapper;
	        this.container = null;
	        this.unique = unique;
	        this.init();
	    }
	
	    _createClass(TagsSearch, [{
	        key: 'init',
	        value: function init() {
	            this.classContainer = 'tagContainer';
	            this.classContainerItem = this.classContainer + '-item';
	            this.classContainerClose = this.classContainer + '-close';
	
	            this.renderHTML();
	            this.watchStore();
	            this.handleEvent();
	        }
	    }, {
	        key: 'renderHTML',
	        value: function renderHTML() {
	            var container = document.createElement('div');
	            container.className = this.classContainer;
	            this.wrapper.appendChild(container);
	            this.container = container;
	        }
	    }, {
	        key: 'watchStore',
	        value: function watchStore() {
	            document.addEventListener(_storesTypes2.default.STORE_SEARCH_UPDATE + this.unique, this.storeUpdated.bind(this));
	        }
	    }, {
	        key: 'storeUpdated',
	        value: function storeUpdated(event) {
	            var _this = this;
	
	            var data = event.detail;
	
	            this.container.innerHTML = '';
	            Object.keys(data).forEach(function (key) {
	                data[key].forEach(function (value) {
	                    var el = undefined,
	                        elClose = undefined;
	                    el = document.createElement('span');
	                    el.textContent = value;
	                    el.className = _this.classContainerItem;
	                    el.setAttribute('data-name', key);
	                    el.setAttribute('data-value', value);
	                    elClose = document.createElement('span');
	                    elClose.textContent = "X";
	                    elClose.className = _this.classContainerClose;
	                    el.appendChild(elClose);
	                    _this.container.appendChild(el);
	                });
	            });
	        }
	    }, {
	        key: 'handleEvent',
	        value: function handleEvent() {
	            var _this2 = this;
	
	            this.container.addEventListener('click', function (event) {
	                var el = event.target;
	
	                if (el.className === _this2.classContainerClose) {
	                    el.parentNode.remove();
	                }
	
	                _utils2.default.triggerEvent(_actionTypes2.default.SEARCH_FILTER_UPDATE + _this2.unique, _this2.getData());
	            });
	        }
	    }, {
	        key: 'getData',
	        value: function getData() {
	            var data = {};
	
	            Array.prototype.forEach.call(this.wrapper.getElementsByClassName(this.classContainerItem), function (tag) {
	                var name = tag.getAttribute('data-name'),
	                    value = tag.getAttribute('data-value');
	
	                data[name] = data[name] || [];
	                data[name].push(value);
	            });
	
	            return data;
	        }
	    }]);
	
	    return TagsSearch;
	}();

	exports.default = TagsSearch;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(4);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _storesTypes = __webpack_require__(12);
	
	var _storesTypes2 = _interopRequireDefault(_storesTypes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Select = function () {
	    function Select(nativeWrapper, unique) {
	        _classCallCheck(this, Select);
	
	        this.nativeWrapper = nativeWrapper;
	        this.pseudoWrapper = null;
	        this.pseudoList = null;
	        this.pseudoResult = null;
	        this.unique = unique;
	        this.init();
	    }
	
	    _createClass(Select, [{
	        key: 'init',
	        value: function init() {
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
	    }, {
	        key: 'watchStore',
	        value: function watchStore() {
	            document.addEventListener(_storesTypes2.default.STORE_SEARCH_UPDATE + this.unique, this.storeUpdated.bind(this));
	        }
	    }, {
	        key: 'storeUpdated',
	        value: function storeUpdated() {
	            var _this = this;
	
	            var data = event.detail;
	            Array.prototype.forEach.call(this.pseudoWrapper.querySelectorAll('li'), function (li) {
	                li.removeAttribute('data-selected');
	            });
	
	            Object.keys(data).forEach(function (name) {
	                Array.prototype.forEach.call(_this.pseudoWrapper.querySelectorAll('[name="' + name + '"] li'), function (li) {
	                    if (data[name].indexOf(li.textContent) !== -1) {
	                        li.setAttribute('data-selected', 'selected');
	                    }
	                });
	            });
	
	            this.updateResult();
	        }
	    }, {
	        key: 'createPseudoSelect',
	        value: function createPseudoSelect() {
	            var _this2 = this;
	
	            var maxWidth, arrow;
	
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
	
	            Array.prototype.forEach.call(this.nativeWrapper.querySelectorAll('option'), function (option) {
	                var item = document.createElement('li'),
	                    isOptionSelected = option.hasAttribute('selected');
	
	                item.className = _this2.classContainerItem;
	                item.textContent = option.textContent;
	                isOptionSelected && item.setAttribute('data-selected', 'selected');
	
	                _this2.pseudoList.appendChild(item);
	            });
	
	            this.pseudoWrapper.appendChild(this.pseudoList);
	            this.nativeWrapper.parentNode.insertBefore(this.pseudoWrapper, this.nativeWrapper);
	            this.updateResult();
	            maxWidth = this.pseudoList.offsetWidth > this.pseudoResult.offsetWidth ? this.pseudoList.offsetWidth : this.pseudoResult.offsetWidth;
	            this.pseudoList.style.minWidth = maxWidth + 'px';
	            this.pseudoResult.style.minWidth = maxWidth + 'px';
	            this.pseudoList.style.display = 'none';
	        }
	    }, {
	        key: 'handlers',
	        value: function handlers() {
	            var _this3 = this;
	
	            document.addEventListener('click', function (event) {
	                var el = event.target,
	                    isInside = false;
	
	                while (el && el !== document) {
	                    if (el === _this3.pseudoWrapper) {
	                        isInside = true;
	                    }
	                    el = el.parentNode;
	                }
	                if (!isInside) {
	                    _this3.pseudoList.style.display = 'none';
	                }
	            });
	
	            this.pseudoResult.addEventListener('click', function (event) {
	                if (_this3.pseudoList.style.display === 'none') {
	                    _this3.pseudoList.style.display = 'block';
	                } else {
	                    _this3.pseudoList.style.display = 'none';
	                }
	            });
	
	            this.pseudoList.addEventListener('click', function (event) {
	                var el = event.target,
	                    ctrlMode = false,
	                    isMultiple = _this3.pseudoList.getAttribute('multiple') !== null;
	
	                if (isMultiple && (event.ctrlKey || event.metaKey)) {
	                    // click with ctrl or Cmd
	                    ctrlMode = true;
	                }
	
	                if (el.tagName.toLowerCase() === 'li') {
	                    var nodePseudoList = Array.prototype.slice.call(_this3.pseudoList.children),
	                        elIndex = nodePseudoList.indexOf(el),
	                        option = _this3.nativeWrapper.children[elIndex];
	
	                    if (!ctrlMode) {
	                        Array.prototype.forEach.call(_this3.nativeWrapper.children, function (option) {
	                            option.removeAttribute('selected');
	                            option.selected = false;
	                        });
	                    }
	
	                    if (option.getAttribute('selected') !== 'selected') {
	                        option.setAttribute('selected', 'selected');
	                        option.selected = true;
	                    } else if (ctrlMode) {
	                        // we may delete the last one only with Ctrl/Command
	                        option.removeAttribute('selected');
	                        option.selected = false;
	                    }
	
	                    if (!isMultiple) {
	                        _this3.pseudoList.style.display = 'none';
	                    }
	
	                    _this3.updateResult();
	
	                    _utils2.default.triggerEventOnElement(_this3.nativeWrapper, 'change');
	                }
	            });
	        }
	    }, {
	        key: 'updateResult',
	        value: function updateResult() {
	            // it's impossible for native non-multiple select haven't value
	            // we can't set empty value for select in browser
	            // that's why I decide to transfer this behavior to pseudoselect
	            // in the video for this task you may set empty state for non-multiple select
	            // but in the case of my project you can't do it
	            // if we really need this behavior we can do it, but there is no analogues among native selects
	
	            var count = 0,
	                result = this.pseudoList.getAttribute('placeholder'),
	                isTextNodeExist = false;
	
	            Array.prototype.forEach.call(this.pseudoList.children, function (li) {
	                if (li.getAttribute('data-selected') === 'selected') {
	                    result = li.textContent;
	                    count++;
	                }
	            });
	
	            if (count > 1) {
	                result = count + ' results';
	            }
	
	            Array.prototype.forEach.call(this.pseudoResult.childNodes, function (node) {
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
	    }]);
	
	    return Select;
	}();

	exports.default = Select;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    SEARCH_FILTER_UPDATE: 'SEARCH_FILTER_UPDATE'
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    STORE_SEARCH_UPDATE: 'STORE_SEARCH_UPDATE'
	};

/***/ }
/******/ ]);
//# sourceMappingURL=build.js.map