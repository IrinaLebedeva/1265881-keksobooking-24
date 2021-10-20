import {formatString} from './utils/format-string.js';
import {hideElement, showElement} from './utils/hide-show-element.js';

const UI_LANG = 'ru';
const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const PRICE_MAX_VALUE = 1000000;
const UI_MESSAGES = [];
UI_MESSAGES['ru'] = [];
UI_MESSAGES['ru']['validate'] = {
  tooShortLength: 'Добавьте ещё $0 симв.',
  tooLongLength: 'Удалите $0 симв.',
  required: 'Поле является обязательным для заполнения',
  tooBigPriceValue: 'Пожалуйста 🙏 , снизьте цену хотя бы на $0! Максимально допустимое значение поля $1',
  tooSmallPriceValue: 'Для выбранного типа жилья 🏠 минимально допустимая цена $0',
  numberRequired: 'Пожалуйста 🙏 , исправьте ввёденное значение. Допускаются только числа.',
};
const MIN_PRICE_BY_TYPES = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
  'hotel': 3000,
};
const AVAILABLE_CAPACITY_BY_ROOMS = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const formElement = document.querySelector('form[name="advert-form"]');
const titleElement = formElement.querySelector('input[name="title"]');
const priceElement = formElement.querySelector('input[name="price"]');
const typeElement = formElement.querySelector('select[name="type"]');
const roomsNumberElement = formElement.querySelector('select[name="rooms"]');
const capacityElement = formElement.querySelector('select[name="capacity"]');
const timeInElement = formElement.querySelector('select[name="timein"]');
const timeOutElement = formElement.querySelector('select[name="timeout"]');

const setPriceMinAttribute = () => {
  const currentType = typeElement.value;
  priceElement.min = MIN_PRICE_BY_TYPES[currentType];
  priceElement.placeholder = MIN_PRICE_BY_TYPES[currentType];
};

const updateCapacityElementProperties = (currentRoomsNumber) => {
  const capacityOptionsList = capacityElement.options;
  const maxAvailableValue = [...capacityOptionsList].reduce((maxAvailableSelectedValue, option) => {
    option.removeAttribute('selected');
    option.removeAttribute('disabled');

    if (AVAILABLE_CAPACITY_BY_ROOMS[currentRoomsNumber].find((roomsValue) => Number(roomsValue) === Number(option.value)) === undefined) {
      option.setAttribute('disabled', 'disabled');
      hideElement(option);
    } else {
      if (maxAvailableSelectedValue < option.value) {
        maxAvailableSelectedValue = option.value;
      }
      showElement(option);
    }
    return maxAvailableSelectedValue;
  }, 0);
  [...capacityOptionsList].forEach((option) => {
    if (Number(option.value) === Number(maxAvailableValue)) {
      option.setAttribute('selected', 'selected');
    }
  });
};

const setAvailableCapacity = () => updateCapacityElementProperties(roomsNumberElement.value);

const syncTimeInField = () => {
  timeInElement.value = timeOutElement.value;
};

const syncTimeOutField = () => {
  timeOutElement.value = timeInElement.value;
};

/**
 * @returns {boolean} true, if field value is valid
 */
const validateTitleElement = () => {
  const titleElementLength = titleElement.value.length;
  let reportMessage = '';

  if (titleElement.validity.valueMissing) {
    reportMessage = UI_MESSAGES[UI_LANG]['validate'].required;
  } else if (titleElementLength < TITLE_MIN_LENGTH) {
    reportMessage = formatString(UI_MESSAGES[UI_LANG]['validate'].tooShortLength, TITLE_MIN_LENGTH - titleElementLength);
  } else if (titleElementLength > TITLE_MAX_LENGTH) {
    reportMessage = formatString(UI_MESSAGES[UI_LANG]['validate'].tooLongLength, titleElementLength - TITLE_MAX_LENGTH);
  }
  titleElement.setCustomValidity(reportMessage);

  return titleElement.reportValidity();
};

/**
 * @returns {boolean} true, if field value is valid
 */
const validatePriceElement = () => {
  const priceElementValue = Number(priceElement.value);
  const priceMinValueByType = Number(priceElement.min);
  let reportMessage = '';

  if (priceElementValue > PRICE_MAX_VALUE) {
    reportMessage = formatString(UI_MESSAGES[UI_LANG]['validate'].tooBigPriceValue, priceElementValue - PRICE_MAX_VALUE, PRICE_MAX_VALUE);
  } else if (priceElementValue < priceMinValueByType || priceElement.validity.rangeUnderflow) {
    reportMessage = formatString(UI_MESSAGES[UI_LANG]['validate'].tooSmallPriceValue, priceMinValueByType);
  } else if (priceElement.validity.typeMismatch || priceElement.validity.badInput) {
    reportMessage = UI_MESSAGES[UI_LANG]['validate'].numberRequired;
  } else if (priceElement.validity.valueMissing) {
    reportMessage = UI_MESSAGES[UI_LANG]['validate'].required;
  }
  priceElement.setCustomValidity(reportMessage);

  return priceElement.reportValidity();
};

/**
 * @returns {boolean} true, if form fields values are valid
 */
const validateForm = () => [
  validateTitleElement(),
  validatePriceElement(),
].some((value) => !value);

const formInitialize = () => {
  setAvailableCapacity();
  setPriceMinAttribute();
  titleElement.focus();

  titleElement.addEventListener('input', validateTitleElement);
  priceElement.addEventListener('input', validatePriceElement);
  typeElement.addEventListener('change', () => {
    setPriceMinAttribute();
    validatePriceElement();
  });
  roomsNumberElement.addEventListener('change', setAvailableCapacity);
  timeInElement.addEventListener('change', syncTimeOutField);
  timeOutElement.addEventListener('change', syncTimeInField);
};

formElement.addEventListener('submit', (evt) => {
  if (!validateForm()) {
    evt.preventDefault();
  }
});

formInitialize();
