import $ from 'jquery';
import store from 'store2';

let _currentCounty = null;
let _counties = [];

let _favoriteCountiesCodes = [];

let _currentCountyListeners = [];
let _countiesListeners = [];
let _favoriteCountiesListeners = [];

/* load favoriteCounties if they are stored */
if(store.has('_favoriteCountiesCodes')) {
    Object.assign(_favoriteCountiesCodes, store.get('_favoriteCountiesCodes'));
}

export default class CountyStore {

    /* API */

    static list() {    
        $.getJSON('counties', data => {
            _counties = data;
            _countiesListeners.forEach(listener => listener());
        });
    }

    static show(countyCode){
        return $.getJSON('counties/' + countyCode, data => {
            _currentCounty = data;
            _currentCountyListeners.forEach(listener => listener());
        });
    }

    /* Direct variable manipulation methods */

    static getCurrentCounty() {
        return _currentCounty;
    }

    static getCounties() {
        return _counties;
    }

    static clearCurrentCounty() {        
        _currentCounty = null;
        _currentCountyListeners.forEach(listener => listener());
    }
    
    static getFavoriteCounties() {
        return _counties.filter(county => CountyStore.isFavorite(county));
    }

    static isFavorite(county) {
        return _favoriteCountiesCodes.indexOf(county.code) !== -1;
    }

    // toggle the county in and out of the favorite counties array
    static toggleFavoriteCounty(county) {
        let index = _favoriteCountiesCodes.indexOf(county.code);
        if(index === -1) {
            _favoriteCountiesCodes.push(county.code);
        }
        else {
            _favoriteCountiesCodes.splice(index, 1);
        }
        store.set('_favoriteCountiesCodes', _favoriteCountiesCodes);
        _favoriteCountiesListeners.forEach(listener => listener());
    }

    /* Listeners */

    static addChangeCountiesListener(_onChange) {
        _countiesListeners.push(_onChange);
    }
    
    static removeChangeCountiesListener(_onChange) {
        let index = _countiesListeners.indexOf(_onChange);
        if(index !== -1) {
            _countiesListeners.splice(index, 1);
        }
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

    static addChangeFavoriteCountiesListener(_onChange) {
        _favoriteCountiesListeners.push(_onChange);
    }

    static removeChangeFavoriteCountiesListener(_onChange) {
        let index = _favoriteCountiesListeners.indexOf(_onChange);
        if(index !== -1) {
            _favoriteCountiesListeners.splice(index, 1);
        }
    }
}