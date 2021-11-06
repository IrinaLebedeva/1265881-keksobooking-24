import {hideElement} from './utils/hide-show-element.js';
import {pluralize} from './utils/pluralize.js';

const OfferTypes = {
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
    this.setTextContent('.popup__type', OfferTypes[card.offer.type]);
    this.setTextContent('.popup__text--capacity', this.getCapacityLangString(card.offer.rooms, card.offer.guests));
    this.setTime('.popup__text--time', card.offer.checkin, card.offer.checkout);
    this.setFeatures(card.offer.features);
    this.setTextContent('.popup__description', card.offer.description);
    this.setPhotos(card.offer.photos);
    this.setImageSrc('.popup__avatar', card.author.avatar);
  }

  /**
   * @param {String} selector
   * @param {String} value
   */
  setTextContent(selector, value) {
    if (value) {
      this.node.querySelector(selector).textContent = value;
    } else {
      this.node.querySelector(selector).textContent = '';
      hideElement(this.node.querySelector(selector));
    }
  }

  setPrice(selector, value) {
    this.setTextContent(selector, value ? `${value} ₽/ночь` : '');
  }

  setTime(selector, checkinValue, checkoutValue) {
    const langStringParts = [];
    langStringParts.push(checkinValue ? `Заезд после ${checkinValue}` : '');
    langStringParts.push(checkoutValue ? `выезд до ${checkoutValue}` : '');
    this.setTextContent(selector, langStringParts.filter((langString) => langString.length).join(', '));
  }

  setImageSrc(selector, value) {
    if (value) {
      this.node.querySelector(selector).src = value;
    } else {
      this.node.querySelector(selector).remove();
    }
  }

  setFeatures(features) {
    const featureListContainerElement = this.node.querySelector('.popup__features');

    if (!features || !features.length) {
      featureListContainerElement.innerHTML = '';
      hideElement(featureListContainerElement);
      return;
    }

    const usedFeaturesSelector = features.map((feature) => `.popup__feature--${feature}`).join(', ');
    const excludedFeaturesListElements = this.node.querySelectorAll(`.popup__features > :not(${usedFeaturesSelector})`);
    excludedFeaturesListElements.forEach((feature) => feature.remove());

    if (!this.node.querySelectorAll('.popup__feature').length) {
      hideElement(featureListContainerElement);
    }
  }

  setPhotos(photos) {
    const photosContainer = this.node.querySelector('.popup__photos');
    photosContainer.innerHTML = '';
    if (!photos || !photos.length) {
      hideElement(photosContainer);
      return;
    }

    const cardPhotosTemplate = this.cardFragment.querySelector('.popup__photos');
    photos.forEach((photo) => {
      const photoTemplate = cardPhotosTemplate.querySelector('.popup__photo').cloneNode(true);
      photoTemplate.src = photo;
      photosContainer.appendChild(photoTemplate);
    });
  }

  getCapacityRoomsLangString(rooms) {
    if (!rooms) {
      return '';
    }
    const pluralizedNoun = pluralize(rooms, 'комната', 'комнаты', 'комнат');
    return `${rooms} ${pluralizedNoun}`;
  }

  getCapacityGuestsLangString(guests) {
    if (!guests) {
      return '';
    }
    const pluralizedNoun = pluralize(guests, 'гостя', 'гостей', 'гостей');
    return `для ${guests} ${pluralizedNoun}`;
  }

  getCapacityLangString(rooms, guests) {
    const langStringParts = [];
    langStringParts.push(this.getCapacityRoomsLangString(rooms));
    langStringParts.push(this.getCapacityGuestsLangString(guests));

    return langStringParts.filter((langString) => langString !== '').join(' ');
  }

  getNode() {
    return this.node;
  }
}

const generateCardMarkup = (card) => {
  const cardMarkup = new CardMarkup(card);
  return cardMarkup.getNode();
};

export {generateCardMarkup};
