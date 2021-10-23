import {createAdvertCards} from './data-mock.js';
import {setPageInactive, setPageActive} from './set-page-state.js';
import {generateCardMarkup} from './generate-markup.js';
import {formInitialize} from './validate-advert-form.js';
import {loadLang} from './load-lang.js';
import {getCurrentLang} from './utils/get-current-lang.js';

const ADVERTS_COUNT = 10;

const advertCards = createAdvertCards(ADVERTS_COUNT);

const renderCard = (card, cardContainer) => {
  cardContainer.appendChild(generateCardMarkup(card));
};

setPageInactive();
setTimeout(setPageActive, 12000);

renderCard(advertCards[7], document.querySelector('#map-canvas'));

loadLang(getCurrentLang());
formInitialize();
