import {createAdvertCards} from './data-mock.js';
import {generateCardMarkup} from './generate-markup.js';

const ADVERTS_COUNT = 10;

const advertCards = createAdvertCards(ADVERTS_COUNT);

const cardsFragment = document.createDocumentFragment();
for (let i = 0; i < advertCards.length; i++) {
  cardsFragment.appendChild(generateCardMarkup(advertCards[i]));
  if (i === 0) {
    document.querySelector('#map-canvas').appendChild(cardsFragment);
  }
}
