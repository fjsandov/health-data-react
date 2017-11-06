import $ from 'jquery';

let _counties = [];
let _currentCounty = null;

let _listListeners = [];
let _currentCountyListeners = [];

export default class CountyStore {
    static list() {    
        $.getJSON('counties', data => {
            _counties = data;
            _listListeners.forEach(listener => listener());
        });
    }

    static show(countyCode){
        return $.getJSON('counties/' + countyCode, data => {
            _currentCounty = data;
            _currentCountyListeners.forEach(listener => listener());
        });
    }

    static getCounties() {
        return _counties;
    }

    static getCurrentCounty() {
        return _currentCounty;
    }

    static addChangeListListener(_onChange) {
        _listListeners.push(_onChange);
    }

    static addChangeCurrentCountyListener(_onChange) {
        _currentCountyListeners.push(_onChange);
    }

    static removeChangeCurrentCountyListener(_onChange) {
        let index = _currentCountyListeners.indexOf(_onChange);
        if(index !== -1) {
            _currentCountyListeners.splice(index, 1);
        }
    }

    static removeChangeListListener(_onChange) {
        let index = _listListeners.indexOf(_onChange);
        if(index !== -1) {
            _listListeners.splice(index, 1);
        }
    }
}