import {getRandomIntegerFromRange, getRandomFloatFromRange} from './utils/get-random-number.js';

const ADVERTS_COUNT = 10;
const MAX_ROOMS_COUNT = 7;
const MIN_PRICE_VALUE = 500;
const MAX_PRICE_VALUE = 100000;
const MAX_GUESTS_COUNT = 10;
const LAT_FROM_VALUE = 35.65000;
const LAT_TO_VALUE = 35.70000;
const LNG_FROM_VALUE = 139.70000;
const LNG_TO_VALUE = 139.80000;
const LOCATION_FRACTION_DIGITS_COUNT = 5;
const TEMPLATE_AVATAR_URL = 'img/avatars/user{{xx}}.png';
const TEMPLATE_DESCRIPTION = '{{title}} with {{features}}';
const DATA_TITLE_DESCRIPTION = ['beautiful', 'comfortable', 'cool', 'wonderful', 'perfect'];
const DATA_TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const DATA_CHECKIN_CHECKOUT = ['12:00', '13:00', '14:00'];
const DATA_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DATA_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

Array.prototype.mixArr = function () {
  // eslint-disable-next-line id-length
  return this.map((i) => [Math.random(), i]).sort().map((i) => i[1]);
};

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const getAvatar = (advertId) => {
  const avatarUrl = TEMPLATE_AVATAR_URL;
  const getAvatarId = (currentAdvertId) => currentAdvertId < 10 ? (`0${currentAdvertId}`) : currentAdvertId;
  return avatarUrl.replace('{{xx}}', getAvatarId(advertId));
};

const getType = () => DATA_TYPE[getRandomIntegerFromRange(0, DATA_TYPE.length - 1)];

const getRandomArray = (dataArr) => (dataArr.length > 1) ?
  dataArr.mixArr().slice(0, getRandomIntegerFromRange(1, dataArr.length)) : dataArr;

const getTitle = (type) => `${DATA_TITLE_DESCRIPTION[getRandomIntegerFromRange(0, DATA_TITLE_DESCRIPTION.length - 1)]} ${type}`.capitalize();

const getDescription = (title, features) =>
  TEMPLATE_DESCRIPTION.replace('{{title}}', title).replace('{{features}}', getRandomArray(features).join(', '));

const advertCard = (advertId) => {
  const type = getType();
  const title = getTitle(type);
  const features = getRandomArray(DATA_FEATURES);
  const lat = getRandomFloatFromRange(LAT_FROM_VALUE, LAT_TO_VALUE, LOCATION_FRACTION_DIGITS_COUNT);
  const lng = getRandomFloatFromRange(LNG_FROM_VALUE, LNG_TO_VALUE, LOCATION_FRACTION_DIGITS_COUNT);

  return {
    author: {
      avatar: getAvatar(advertId),
    },
    offer: {
      title: title,
      address: `${lat}, ${lng}`,
      price: getRandomIntegerFromRange(MIN_PRICE_VALUE, MAX_PRICE_VALUE),
      type: type,
      rooms: getRandomIntegerFromRange(1, MAX_ROOMS_COUNT),
      guests: getRandomIntegerFromRange(1, MAX_GUESTS_COUNT),
      checkin: DATA_CHECKIN_CHECKOUT[getRandomIntegerFromRange(0, DATA_CHECKIN_CHECKOUT.length - 1)],
      checkout: DATA_CHECKIN_CHECKOUT[getRandomIntegerFromRange(0, DATA_CHECKIN_CHECKOUT.length - 1)],
      features: features,
      description: getDescription(title, features),
      photos: getRandomArray(DATA_PHOTOS),
    },
    location: {
      lat: lat,
      lng: lng,
    },
  };
};

const getAdvertCards = () => {
  const mockAdvertCards = [];
  // eslint-disable-next-line id-length
  for (let i = 0; i < ADVERTS_COUNT; i++) {
    mockAdvertCards[i] = advertCard(i+1);
  }
  return mockAdvertCards;
};

getAdvertCards();
