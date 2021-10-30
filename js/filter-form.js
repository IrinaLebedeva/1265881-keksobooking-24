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

const filterByType = (cards) => {
  if (typeFilterElement.value !== DEFAULT_TYPE_FILTER_VALUE) {
    cards = cards.filter((card) => (card.offer.type) ? card.offer.type === typeFilterElement.value : false);
  }
  return cards;
};

const filterByPrice = (cards) => {
  const priceCurrentType = PRICE_FILTER_RANGE[priceFilterElement.value];
  if (priceFilterElement.value !== DEFAULT_PRICE_FILTER_VALUE && priceCurrentType) {
    cards = cards.filter((card) => {
      if (!card.offer.price) {
        return false;
      }

      const priceValue = Number(card.offer.price);
      if (priceValue >= priceCurrentType.from) {
        if (priceCurrentType.to) {
          if (priceValue < priceCurrentType.to) {
            return true;
          }
        } else {
          return true;
        }
      }
      return false;
    });
  }
  return cards;
};

const filterByRoomsNumber = (cards) => {
  if (roomsNumberFilterElement.value !== DEFAULT_ROOMS_NUMBER_FILTER_VALUE) {
    const roomsNumber = Number(roomsNumberFilterElement.value);
    cards = cards.filter((card) => {
      if (!card.offer.rooms) {
        return false;
      }
      return Number(card.offer.rooms) === roomsNumber;
    });
  }
  return cards;
};

const filterByGuestsNumber = (cards) => {
  if (guestsNumberFilterElement.value !== DEFAULT_GUESTS_NUMBER_FILTER_VALUE) {
    const guestsNumber = Number(guestsNumberFilterElement.value);
    cards = cards.filter((card) => {
      if (typeof card.offer.guests === 'undefined') {
        return false;
      }
      return Number(card.offer.guests) === guestsNumber;
    });
  }
  return cards;
};

const filterByFeatures = (cards) => {
  let filteredCards = cards;
  featuresFilterElementList.forEach((featuresFilterElement) => {
    if (featuresFilterElement.checked) {
      filteredCards = filteredCards.filter((card) => {
        if (!card.offer.features) {
          return false;
        }
        return card.offer.features.includes(featuresFilterElement.value);
      });
    }
  });
  return filteredCards;
};

const renderFilteredCommonMarkers = () => {
  let filteredAdvertCards = filterByType(advertCards);
  filteredAdvertCards = filterByPrice(filteredAdvertCards);
  filteredAdvertCards = filterByRoomsNumber(filteredAdvertCards);
  filteredAdvertCards = filterByGuestsNumber(filteredAdvertCards);
  filteredAdvertCards = filterByFeatures(filteredAdvertCards);

  removeMapMarkersList();
  setCommonMarkers(filteredAdvertCards.slice(0, MAX_COMMON_MARKERS_COUNT_ON_MAP), generateCardMarkup);
};

typeFilterElement.addEventListener('change', debounce(renderFilteredCommonMarkers, RERENDER_DELAY));
priceFilterElement.addEventListener('change', debounce(renderFilteredCommonMarkers, RERENDER_DELAY));
roomsNumberFilterElement.addEventListener('change', debounce(renderFilteredCommonMarkers, RERENDER_DELAY));
guestsNumberFilterElement.addEventListener('change', debounce(renderFilteredCommonMarkers, RERENDER_DELAY));
featuresFilterElementList.forEach((element) =>
  element.addEventListener('click', debounce(renderFilteredCommonMarkers, RERENDER_DELAY)));

export {resetForm, filterFormInitialize};
