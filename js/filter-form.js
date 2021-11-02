import {removeMapMarkersList, MAX_COMMON_MARKERS_COUNT_ON_MAP, setCommonMarkers} from './map.js';
import {generateCardMarkup} from './generate-markup.js';
import {debounce} from './utils/debounce.js';

const RERENDER_DELAY = 500;
const DEFAULT_TYPE_FILTER_VALUE = 'any';
const DEFAULT_PRICE_FILTER_VALUE = 'any';
const DEFAULT_ROOMS_NUMBER_FILTER_VALUE = 'any';
const DEFAULT_GUESTS_NUMBER_FILTER_VALUE = 'any';
const PRICE_FILTER_RANGE = {
  low: {
    from: 0,
    to: 10000,
  },
  middle: {
    from: 10000,
    to: 50000,
  },
  high: {
    from: 50000,
  },
};

const formElement = document.querySelector('form[name="filter-form"]');
const typeFilterElement = formElement.querySelector('select[name="housing-type"]');
const priceFilterElement = formElement.querySelector('select[name="housing-price"]');
const roomsNumberFilterElement = formElement.querySelector('select[name="housing-rooms"]');
const guestsNumberFilterElement = formElement.querySelector('select[name="housing-guests"]');
const featuresFilterElementList = formElement.querySelectorAll('input[name="features"]');

let advertCards = {};

const resetForm = () => {
  formElement.reset();
};

const filterFormInitialize = (cards) => {
  advertCards = cards;
};

const filterByType = (card) => typeFilterElement.value === DEFAULT_TYPE_FILTER_VALUE || card.offer.type && card.offer.type === typeFilterElement.value;

const filterByPrice = (card) => {
  const priceCurrentType = PRICE_FILTER_RANGE[priceFilterElement.value];
  if (priceFilterElement.value === DEFAULT_PRICE_FILTER_VALUE || !priceCurrentType) {
    return true;
  }
  return !(!card.offer.price || card.offer.price < priceCurrentType.from || priceCurrentType.to && card.offer.price >= priceCurrentType.to);
};

const filterByRoomsNumber = (card) => roomsNumberFilterElement.value === DEFAULT_ROOMS_NUMBER_FILTER_VALUE || card.offer.rooms && card.offer.rooms === Number(roomsNumberFilterElement.value);

const filterByGuestsNumber = (card) => guestsNumberFilterElement.value === DEFAULT_GUESTS_NUMBER_FILTER_VALUE || card.offer.guests !== undefined && card.offer.guests === Number(guestsNumberFilterElement.value);

const filterByFeatures = (card) => {
  const featuresCheckedElementsList = formElement.querySelectorAll('input[name="features"]:checked');
  if (!featuresCheckedElementsList.length) {
    return true;
  }
  if (!card.offer.features) {
    return false;
  }

  let cardFeaturesCount = 0;
  featuresCheckedElementsList.forEach((featuresFilterElement) => {
    if (card.offer.features.includes(featuresFilterElement.value)) {
      cardFeaturesCount++;
    }
  });
  return cardFeaturesCount === featuresCheckedElementsList.length;
};

const renderFilteredCommonMarkers = () => {
  removeMapMarkersList();

  const filteredAdvertCards = [];
  for (const card of advertCards) {
    if (filterByType(card) &&
      filterByPrice(card) &&
      filterByRoomsNumber(card) &&
      filterByGuestsNumber(card) &&
      filterByFeatures(card)) {
      filteredAdvertCards.push(card);
    }
    if (filteredAdvertCards.length === MAX_COMMON_MARKERS_COUNT_ON_MAP) {
      break;
    }
  }

  setCommonMarkers(filteredAdvertCards, generateCardMarkup);
};

typeFilterElement.addEventListener('change', debounce(renderFilteredCommonMarkers, RERENDER_DELAY));
priceFilterElement.addEventListener('change', debounce(renderFilteredCommonMarkers, RERENDER_DELAY));
roomsNumberFilterElement.addEventListener('change', debounce(renderFilteredCommonMarkers, RERENDER_DELAY));
guestsNumberFilterElement.addEventListener('change', debounce(renderFilteredCommonMarkers, RERENDER_DELAY));
featuresFilterElementList.forEach((element) =>
  element.addEventListener('click', debounce(renderFilteredCommonMarkers, RERENDER_DELAY)));

export {resetForm, filterFormInitialize};
