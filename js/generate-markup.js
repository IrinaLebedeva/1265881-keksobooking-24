const HIDDEN_CSS_CLASS_NAME = 'hidden';
const OFFER_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const cardFragment = document.querySelector('#card').content;
const cardTemplate = cardFragment.querySelector('.popup');
const cardPhotosTemplate = cardFragment.querySelector('.popup__photos');

const setElementTextContent = (element, selector, value) => {
  if (value) {
    element.querySelector(selector).textContent = value;
  } else {
    element.querySelector(selector).textContent = '';
    element.querySelector(selector).classList.add(HIDDEN_CSS_CLASS_NAME);
  }
};

const setElementPrice = (element, selector, value) => {
  setElementTextContent(element, selector, value ? `${value} ₽/ночь` : false);
};

const setElementTime = (element, selector, checkinValue, checkoutValue) => {
  const langStringParts = [];
  langStringParts.push(checkinValue ? `Заезд после ${checkinValue}` : false);
  langStringParts.push(checkoutValue ? `выезд до ${checkoutValue}` : false);
  setElementTextContent(element, selector, langStringParts.filter((langString) => langString !== false).join(', '));
};

const setElementImageSrc = (element, selector, value) => {
  if (value) {
    element.querySelector(selector).src = value;
  } else {
    element.remove();
  }
};

const setElementFeatures = (element, features) => {
  const featureListContainerElement = element.querySelector('.popup__features');

  if (!features) {
    featureListContainerElement.innerHTML = '';
    featureListContainerElement.classList.add(HIDDEN_CSS_CLASS_NAME);
    return;
  }

  const usedFeaturesSelector = features.map((feature) => `.popup__feature--${feature}`).join(', ');
  const excludedFeaturesListElements = element.querySelectorAll(`.popup__features > :not(${usedFeaturesSelector})`);
  const excludedFeaturesListElementsNumber = excludedFeaturesListElements.length;
  excludedFeaturesListElements.forEach((feature) => feature.remove());

  if (element.querySelectorAll('.popup__feature').length === excludedFeaturesListElementsNumber) {
    featureListContainerElement.classList.add(HIDDEN_CSS_CLASS_NAME);
  }
};

const getNotEmptyPhotos = (photos) => {
  if (!photos) {
    return false;
  }
  const notEmptyPhotos = [];
  for (let i = 0; i < photos.length; i++) {
    if (photos[i].length) {
      notEmptyPhotos.push(photos[i]);
    }
  }
  return notEmptyPhotos.length ? notEmptyPhotos : false;
};

const setElementPhotos = (element, photos) => {
  const photosContainer = element.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  if (!photos) {
    photosContainer.classList.add(HIDDEN_CSS_CLASS_NAME);
    return;
  }

  const photosContainerFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const photoTemplate = cardPhotosTemplate.querySelector('.popup__photo').cloneNode(true);
    photoTemplate.src = photo;
    photosContainerFragment.appendChild(photoTemplate);
  });
  photosContainer.appendChild(photosContainerFragment);
};

const getCapacityRoomsLangString = (rooms) => {
  if (!rooms) {
    return false;
  }
  let langString = `${rooms} комнат`;
  if (rooms < 2) {
    langString = `${rooms} комната`;
  } else if (rooms < 5) {
    langString = `${rooms} комнаты`;
  }
  return langString;
};

const getCapacityGuestsLangString = (guests) => {
  if (guests) {
    return guests === 1 ? `для ${guests} гостя` : `для ${guests} гостей`;
  } else {
    return false;
  }
};

const getCapacityLangString = (rooms, guests) => {
  const langStringParts = [];
  langStringParts.push(getCapacityRoomsLangString(rooms));
  langStringParts.push(getCapacityGuestsLangString(guests));

  return langStringParts.filter((langString) => langString !== false).join(' ');
};

const generateCardMarkup = (card) => {
  const element = cardTemplate.cloneNode(true);
  setElementTextContent(element, '.popup__title', card.offer.title);
  setElementTextContent(element, '.popup__text--address', card.offer.address);
  setElementPrice(element, '.popup__text--price', card.offer.price);
  setElementTextContent(element, '.popup__type', OFFER_TYPES[card.offer.type]);
  setElementTextContent(element, '.popup__text--capacity', getCapacityLangString(card.offer.rooms, card.offer.guests));
  setElementTime(element, '.popup__text--time', card.offer.checkin, card.offer.checkout);
  setElementFeatures(element, card.offer.features);
  setElementTextContent(element, '.popup__description', card.offer.description);
  setElementPhotos(element, getNotEmptyPhotos(card.offer.photos));
  setElementImageSrc(element, '.popup__avatar', card.author.avatar);

  return element;
};

export {generateCardMarkup};
