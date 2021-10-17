import {createAdvertCards} from './data-mock.js';
import {generateCardMarkup} from './generate-markup.js';
import './validate-advert-form.js';

const ADVERTS_COUNT = 10;

const advertCards = createAdvertCards(ADVERTS_COUNT);

const renderCard = (card, cardContainer) => {
  cardContainer.appendChild(generateCardMarkup(card));
};

renderCard(advertCards[7], document.querySelector('#map-canvas'));
