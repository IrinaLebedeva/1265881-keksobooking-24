import {getAdvertCard} from './utils/get-advert-card.js';

const ADVERTS_COUNT = 10;

const getAdvertCards = () => Array(ADVERTS_COUNT).fill(null).map((_, i) => getAdvertCard(i+1));

getAdvertCards();
