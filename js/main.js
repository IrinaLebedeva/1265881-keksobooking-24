import {initializeMap, setMainMarker, setCommonMarkers, MAX_COMMON_MARKERS_COUNT_ON_MAP} from './map.js';
import {initializeFilterForm} from './filter-form.js';
import {getData} from './api-methods.js';
import {showGetDataErrorMessage} from './ui-messages.js';
import {setPageInactive, setAdvertFormActive, setMapFiltersFormActive} from './set-page-state.js';
import {shuffleArray} from './utils/shuffle-array.js';
import {generateCardMarkup} from './generate-markup.js';
import {initializeAdvertForm, setAddress} from './advert-form.js';
import {loadLang} from './load-lang.js';
import {getCurrentLang} from './utils/get-current-lang.js';

const GET_ADVERTS_DATA_URL = 'https://24.javascript.pages.academy/keksobooking/data';

const map = initializeMap();

const generateCommonMarkers = (advertCards) => {
  initializeFilterForm(advertCards);
  setCommonMarkers(shuffleArray(advertCards).slice(0, MAX_COMMON_MARKERS_COUNT_ON_MAP), generateCardMarkup);
  setMapFiltersFormActive();
};

const initializePage = () => {
  map.whenReady(() => {
    setAdvertFormActive();
    setMainMarker(setAddress);
    getData(GET_ADVERTS_DATA_URL, 'advertCards', generateCommonMarkers, showGetDataErrorMessage);
    initializeAdvertForm();
  });
};

setPageInactive();
loadLang(getCurrentLang(), initializePage);
