const HIDDEN_CSS_CLASS_NAME = 'hidden';
const OFFER_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

class CardMarkup {
  constructor(card) {
    this.cardFragment = document.querySelector('#card').content;
    this.node = this.cardFragment.querySelector('.popup').cloneNode(true);

    this.setTextContent('.popup__title', card.offer.title);
    this.setTextContent('.popup__text--address', card.offer.address);
    this.setPrice('.popup__text--price', card.offer.price);
    this.setTextContent('.popup__type', OFFER_TYPES[card.offer.type]);
    this.setTextContent('.popup__text--capacity', this.getCapacityLangString(card.offer.rooms, card.offer.guests));
    this.setTime('.popup__text--time', card.offer.checkin, card.offer.checkout);
    this.setFeatures(card.offer.features);
    this.setTextContent('.popup__description', card.offer.description);
    this.setPhotos(this.getNotEmptyPhotos(card.offer.photos));
    this.setImageSrc('.popup__avatar', card.author.avatar);
  }

  setTextContent(selector, value) {
    if (value) {
      this.node.querySelector(selector).textContent = value;
    } else {
      this.node.querySelector(selector).textContent = '';
      this.node.querySelector(selector).classList.add(HIDDEN_CSS_CLASS_NAME);
    }
  }

  setPrice(selector, value) {
    this.setTextContent(selector, value ? `${value} ₽/ночь` : false);
  }

  setTime(selector, checkinValue, checkoutValue) {
    const langStringParts = [];
    langStringParts.push(checkinValue ? `Заезд после ${checkinValue}` : false);
    langStringParts.push(checkoutValue ? `выезд до ${checkoutValue}` : false);
    this.setTextContent(selector, langStringParts.filter((langString) => langString !== false).join(', '));
  }

  setImageSrc(selector, value) {
    if (value) {
      this.node.querySelector(selector).src = value;
    } else {
      this.node.remove();
    }
  }

  setFeatures(features) {
    const featureListContainerElement = this.node.querySelector('.popup__features');

    if (!features) {
      featureListContainerElement.innerHTML = '';
      featureListContainerElement.classList.add(HIDDEN_CSS_CLASS_NAME);
      return;
    }

    const usedFeaturesSelector = features.map((feature) => `.popup__feature--${feature}`).join(', ');
    const excludedFeaturesListElements = this.node.querySelectorAll(`.popup__features > :not(${usedFeaturesSelector})`);
    const excludedFeaturesListElementsNumber = excludedFeaturesListElements.length;
    excludedFeaturesListElements.forEach((feature) => feature.remove());

    if (this.node.querySelectorAll('.popup__feature').length === excludedFeaturesListElementsNumber) {
      featureListContainerElement.classList.add(HIDDEN_CSS_CLASS_NAME);
    }
  }

  getNotEmptyPhotos(photos) {
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
  }

  setPhotos(photos) {
    const photosContainer = this.node.querySelector('.popup__photos');
    photosContainer.innerHTML = '';
    if (!photos) {
      photosContainer.classList.add(HIDDEN_CSS_CLASS_NAME);
      return;
    }

    const cardPhotosTemplate = this.cardFragment.querySelector('.popup__photos');
    const photosContainerFragment = document.createDocumentFragment();
    photos.forEach((photo) => {
      const photoTemplate = cardPhotosTemplate.querySelector('.popup__photo').cloneNode(true);
      photoTemplate.src = photo;
      photosContainerFragment.appendChild(photoTemplate);
    });
    photosContainer.appendChild(photosContainerFragment);
  }

  getCapacityRoomsLangString(rooms) {
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
  }

  getCapacityGuestsLangString(guests) {
    if (guests) {
      return guests === 1 ? `для ${guests} гостя` : `для ${guests} гостей`;
    } else {
      return false;
    }
  }

  getCapacityLangString(rooms, guests) {
    const langStringParts = [];
    langStringParts.push(this.getCapacityRoomsLangString(rooms));
    langStringParts.push(this.getCapacityGuestsLangString(guests));

    return langStringParts.filter((langString) => langString !== false).join(' ');
  }
}

const generateCardMarkup = (card) => {
  const cardMarkup = new CardMarkup(card);
  return cardMarkup.node;
};

export {generateCardMarkup};
