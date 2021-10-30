import {mapInitialize, setMainMarker, setCommonMarkers} from './map.js';
import {filterFormInitialize} from './filter-form.js';
import {getData} from './api-methods.js';
import {showGetDataErrorMessage} from './ui-messages.js';
import {setPageInactive, setAdvertFormActive, setMapFiltersFormActive} from './set-page-state.js';
import {shuffleArray} from './utils/shuffle-array.js';
import {generateCardMarkup} from './generate-markup.js';
import {advertFormInitialize, setAddress} from './advert-form.js';
import {loadLang} from './load-lang.js';
import {getCurrentLang} from './utils/get-current-lang.js';

const GET_ADVERTS_DATA_URL = 'https://24.javascript.pages.academy/keksobooking/data';
const ADVERT_CARDS_COUNT = 10;

const map = mapInitialize();

const generateCommonMarkers = (advertCards) => {
  filterFormInitialize(advertCards);
  setCommonMarkers(shuffleArray(advertCards).slice(0, ADVERT_CARDS_COUNT), generateCardMarkup);
  setMapFiltersFormActive();
};

const pageInit = () => {
  map.whenReady(() => {
    setAdvertFormActive();
    setMainMarker(setAddress);
    getData(GET_ADVERTS_DATA_URL, generateCommonMarkers, showGetDataErrorMessage);
    advertFormInitialize();
  });
};

setPageInactive();
loadLang(getCurrentLang()).finally(pageInit);
