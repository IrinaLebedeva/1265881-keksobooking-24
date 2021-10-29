import {mapInitialize, setMainMarker, setCommonMarkers} from './map.js';
import {getData} from './api-methods.js';
import {showGetDataErrorMessage} from './ui-messages.js';
import {setPageInactive, setPageActive} from './set-page-state.js';
import {generateCardMarkup} from './generate-markup.js';
import {formInitialize, setAddress} from './advert-form.js';
import {loadLang} from './load-lang.js';
import {getCurrentLang} from './utils/get-current-lang.js';

const GET_ADVERTS_DATA_URL = 'https://24.javascript.pages.academy/keksobooking/data';
const map = mapInitialize();

const generateCommonMarkers = (advertCards) => setCommonMarkers(advertCards, generateCardMarkup);

const pageInit = () => {
  map.whenReady(() => {
    setPageActive();

    setMainMarker(setAddress);
    getData(GET_ADVERTS_DATA_URL, generateCommonMarkers, showGetDataErrorMessage);

    formInitialize();
  });
};

setPageInactive();
loadLang(getCurrentLang()).finally(pageInit);
