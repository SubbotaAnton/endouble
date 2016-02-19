'use strict';

import SearchFilter from './components/SearchFilter';

const filterQuery = '[data-type="searchFilter"]';
var filters = [];

Array.prototype.forEach.call(document.querySelectorAll(filterQuery), el => {
    filters.push(new SearchFilter(el));
});