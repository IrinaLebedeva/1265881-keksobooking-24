import {mapInitialize, setMainMarker, setCommonMarkers} from './map.js';
import {createAdvertCards} from './data-mock.js';
import {setPageInactive, setPageActive} from './set-page-state.js';
import {generateCardMarkup} from './generate-markup.js';
import {formInitialize, setAddress} from './advert-form.js';
import {loadLang} from './load-lang.js';
import {getCurrentLang} from './utils/get-current-lang.js';

const ADVERTS_COUNT = 10;

const map = mapInitialize();

setPageInactive();

map.whenReady(() => {
  setPageActive();

  setMainMarker(setAddress);
  setCommonMarkers(createAdvertCards(ADVERTS_COUNT), generateCardMarkup);

  loadLang(getCurrentLang());
  formInitialize();
});
