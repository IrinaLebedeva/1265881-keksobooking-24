import {mapInitialize, addMainMarker, addCommonMarker} from './map.js';
import {createAdvertCards} from './data-mock.js';
import {setPageInactive, setPageActive} from './set-page-state.js';
import {generateCardMarkup} from './generate-markup.js';
import {formInitialize, setAddress} from './advert-form.js';
import {loadLang} from './load-lang.js';
import {getCurrentLang} from './utils/get-current-lang.js';

const ADVERTS_COUNT = 10;

const map = mapInitialize();

const setMainMarker = () => {
  const mainMarker = addMainMarker(map);
  setAddress(mainMarker.getLatLng());
  mainMarker.on('moveend', () => {
    setAddress(mainMarker.getLatLng());
  });
};

const setCommonMarkers = () => {
  const advertCards = createAdvertCards(ADVERTS_COUNT);
  advertCards.forEach((card) => {
    const marker = addCommonMarker(map, [card.location.lat, card.location.lng]);
    marker.bindPopup(() => generateCardMarkup(card));
  });
};

setPageInactive();

map.whenReady(() => {
  setPageActive();

  setMainMarker();
  setCommonMarkers();

  loadLang(getCurrentLang());
  formInitialize();
});
