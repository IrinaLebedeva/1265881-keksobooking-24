import {getRandomFloatFromRange, getRandomIntegerFromRange} from './utils/get-random-number.js';

const ROOMS_MAX_COUNT = 7;
const PRICE_MIN_VALUE = 500;
const PRICE_MAX_VALUE = 100000;
const MAX_GUESTS_COUNT = 10;
const LAT_FROM_VALUE = 35.65000;
const LAT_TO_VALUE = 35.70000;
const LNG_FROM_VALUE = 139.70000;
const LNG_TO_VALUE = 139.80000;
const LOCATION_FRACTION_DIGITS_COUNT = 5;
const TEMPLATE_AVATAR_URL = 'img/avatars/user{{id}}.png';
const TEMPLATE_DESCRIPTION = '{{title}} with {{features}}';
const DESCRIPTIONS = ['beautiful', 'comfortable', 'cool', 'wonderful', 'perfect'];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_CHECKOUT_VALUES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomElementFromArray = (dataArr) => dataArr[getRandomIntegerFromRange(0, dataArr.length - 1)];

const getRandomArray = (dataArr) => {
  if (dataArr.length < 2) {
    return dataArr;
  }

  const shuffledDataArr = dataArr.map((i) => [Math.random(), i]).sort().map((i) => i[1]);
  return shuffledDataArr.slice(0, getRandomIntegerFromRange(1, dataArr.length));
};

const createAvatarUrl = (advertId) => {
  const id = advertId < 10 ? `0${advertId}` : advertId;
  return TEMPLATE_AVATAR_URL.replace('{{id}}', id);
};

const createTitle = (type) => `${DESCRIPTIONS[getRandomIntegerFromRange(0, DESCRIPTIONS.length - 1)]} ${type}`;

const createDescription = (title, features) =>
  TEMPLATE_DESCRIPTION.replace('{{title}}', title).replace('{{features}}', features.reverse().join(', '));

/** *
 * @param {number} advertId
 * @return {Object}
 */
const createAdvertCard = (advertId) => {
  const type = getRandomElementFromArray(TYPES);
  const title = createTitle(type);
  const features = getRandomArray(FEATURES);
  const lat = getRandomFloatFromRange(LAT_FROM_VALUE, LAT_TO_VALUE, LOCATION_FRACTION_DIGITS_COUNT);
  const lng = getRandomFloatFromRange(LNG_FROM_VALUE, LNG_TO_VALUE, LOCATION_FRACTION_DIGITS_COUNT);

  return {
    author: {
      avatar: createAvatarUrl(advertId),
    },
    offer: {
      title,
      address: `${lat}, ${lng}`,
      price: getRandomIntegerFromRange(PRICE_MIN_VALUE, PRICE_MAX_VALUE),
      type,
      rooms: getRandomIntegerFromRange(1, ROOMS_MAX_COUNT),
      guests: getRandomIntegerFromRange(1, MAX_GUESTS_COUNT),
      checkin: getRandomElementFromArray(CHECKIN_CHECKOUT_VALUES),
      checkout: getRandomElementFromArray(CHECKIN_CHECKOUT_VALUES),
      features,
      description: createDescription(title, features),
      photos: getRandomArray(PHOTOS),
    },
    location: {
      lat,
      lng,
    },
  };
};

/**
 * @param {number} advertsCount
 * @return {Array.<Object>}
 */
const getAdvertCards = (advertsCount) => Array(advertsCount).fill(null).map((_, i) => createAdvertCard(i + 1));

export {createAdvertCard, getAdvertCards};