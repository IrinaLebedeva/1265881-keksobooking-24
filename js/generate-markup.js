const HIDDEN_CSS_CLASS_NAME = 'hidden';
const LANG_PATTERNS = {
  price: '{{price}} ₽/ночь',
  capacityRooms: '{{rooms}} комнаты',
  capacityGuests: 'для {{guests}} гостей',
  checkin: 'Заезд после {{checkin}}',
  checkout: 'выезд до {{checkout}}',
};
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

const setElementTextContentByPattern = (element, selector, valueParts, separator = ' ') => {
  const resultTextContentParts = [];

  for (const valuePart of valueParts) {
    if (valuePart.value) {
      resultTextContentParts.push(valuePart.langPattern.replace(valuePart.pattern, valuePart.value));
    }
  }

  if (resultTextContentParts.length) {
    element.querySelector(selector).textContent = resultTextContentParts.join(separator);
  } else {
    element.querySelector(selector).textContent = '';
    element.querySelector(selector).classList.add(HIDDEN_CSS_CLASS_NAME);
  }
};

const setElementImageSrc = (element, selector, value) => {
  if (value) {
    element.querySelector(selector).src = value;
  } else {
    element.remove();
  }
};

const setElementFeatures = (element, features) => {
  const featureListContainer = element.querySelector('.popup__features');

  if (!features) {
    featureListContainer.innerHTML = '';
    featureListContainer.classList.add(HIDDEN_CSS_CLASS_NAME);
    return;
  }

  const featureList = element.querySelectorAll('.popup__feature');
  let usedfeaturesCount = featureList.length;
  featureList.forEach((featureListItem) => {
    const isAvailableFeature = features.some(
      (featureName) => featureListItem.classList.contains(`popup__feature--${featureName}`),
    );

    if (!isAvailableFeature) {
      usedfeaturesCount--;
      featureListItem.remove();
    }
  });

  if (!usedfeaturesCount) {
    featureListContainer.classList.add(HIDDEN_CSS_CLASS_NAME);
  }
};

const setElementPhotos = (element, photos) => {
  if (!photos) {
    element.querySelector('.popup__photos').classList.add(HIDDEN_CSS_CLASS_NAME);
    return;
  }

  const photosContainer = element.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  const photosContainerFragment = document.createDocumentFragment();

  for (let i = 0; i < photos.length; i++) {
    if (!photos[i].length) {
      continue;
    }
    const photoTemplate = cardPhotosTemplate.cloneNode(true);
    photoTemplate.querySelector('.popup__photo').src = photos[i];
    photosContainerFragment.appendChild(photoTemplate);
  }
  if (!photosContainerFragment.children.length) {
    photosContainer.classList.add(HIDDEN_CSS_CLASS_NAME);
    return;
  }

  photosContainer.appendChild(photosContainerFragment);
};

const generateCardMarkup = (card) => {
  const element = cardTemplate.cloneNode(true);

  setElementTextContent(element, '.popup__title', card.offer.title);
  setElementTextContent(element, '.popup__text--address', card.offer.address);
  setElementTextContentByPattern(element, '.popup__text--price',
    [{
      value: card.offer.price,
      pattern: '{{price}}',
      langPattern: LANG_PATTERNS.price,
    }],
  );
  setElementTextContent(element, '.popup__type', OFFER_TYPES[card.offer.type]);
  setElementTextContentByPattern(element, '.popup__text--capacity',
    [
      {
        value: card.offer.rooms,
        pattern: '{{rooms}}',
        langPattern: LANG_PATTERNS.capacityRooms,
      },
      {
        value: card.offer.guests,
        pattern: '{{guests}}',
        langPattern: LANG_PATTERNS.capacityGuests,
      },
    ],
  );
  setElementTextContentByPattern(element, '.popup__text--time',
    [
      {
        value: card.offer.checkin,
        pattern: '{{checkin}}',
        langPattern: LANG_PATTERNS.checkin,
      },
      {
        value: card.offer.checkout,
        pattern: '{{checkout}}',
        langPattern: LANG_PATTERNS.checkout,
      },
    ],
    ', ',
  );
  setElementFeatures(element, card.offer.features);
  setElementTextContent(element, '.popup__description', card.offer.description);
  setElementPhotos(element, card.offer.photos);
  setElementImageSrc(element, '.popup__avatar', card.author.avatar);

  return element;
};

export {generateCardMarkup};
