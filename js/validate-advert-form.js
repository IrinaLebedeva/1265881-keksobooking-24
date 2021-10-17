import {formatString} from './utils/format-string.js';

const HIDDEN_CSS_CLASS_NAME = 'hidden';
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
  const currentType = typeElement.options[typeElement.selectedIndex].value;
  priceElement.min = MIN_PRICE_BY_TYPES[currentType];
  priceElement.placeholder = MIN_PRICE_BY_TYPES[currentType];
};

const updateCapacityElementProperties = (currentRoomsNumber) => {
  const capacityOptionsList = capacityElement.options;
  let maxAvailableSelectedValue = 0;
  Array.prototype.forEach.call(capacityOptionsList, (option) => {
    option.removeAttribute('selected');
    option.removeAttribute('disabled');

    if (AVAILABLE_CAPACITY_BY_ROOMS[currentRoomsNumber].find((roomsValue) => Number(roomsValue) === Number(option.value)) === undefined) {
      option.setAttribute('disabled', 'disabled');
      option.classList.add(HIDDEN_CSS_CLASS_NAME);
    } else {
      if (maxAvailableSelectedValue < option.value) {
        maxAvailableSelectedValue = option.value;
      }
      option.classList.remove(HIDDEN_CSS_CLASS_NAME);
    }
  });
  Array.prototype.forEach.call(capacityOptionsList, (option) => {
    if (Number(option.value) === Number(maxAvailableSelectedValue)) {
      option.setAttribute('selected', 'selected');
    }
  });
};

const setAvailableCapacity = () => updateCapacityElementProperties(roomsNumberElement.options[roomsNumberElement.selectedIndex].value);

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
  let isError = true;
  const titleElementLength = titleElement.value.length;

  if (titleElement.validity.valueMissing) {
    titleElement.setCustomValidity(UI_MESSAGES[UI_LANG]['validate'].required);
  } else if (titleElementLength < TITLE_MIN_LENGTH) {
    titleElement.setCustomValidity(formatString(UI_MESSAGES[UI_LANG]['validate'].tooShortLength, TITLE_MIN_LENGTH - titleElementLength));
  } else if (titleElementLength > TITLE_MAX_LENGTH) {
    titleElement.setCustomValidity(formatString(UI_MESSAGES[UI_LANG]['validate'].tooLongLength, titleElementLength - TITLE_MAX_LENGTH));
  } else {
    titleElement.setCustomValidity('');
    isError = false;
  }
  titleElement.reportValidity();

  return !isError;
};

/**
 * @returns {boolean} true, if field value is valid
 */
const validatePriceElement = () => {
  let isError = true;
  const priceElementValue = Number(priceElement.value);
  const priceMinValueByType = Number(priceElement.min);

  if (priceElementValue > PRICE_MAX_VALUE) {
    priceElement.setCustomValidity(formatString(UI_MESSAGES[UI_LANG]['validate'].tooBigPriceValue, priceElementValue - PRICE_MAX_VALUE, PRICE_MAX_VALUE));
  } else if (priceElementValue < priceMinValueByType || priceElement.validity.rangeUnderflow) {
    priceElement.setCustomValidity(formatString(UI_MESSAGES[UI_LANG]['validate'].tooSmallPriceValue, priceMinValueByType));
  } else if (priceElement.validity.typeMismatch || priceElement.validity.badInput) {
    priceElement.setCustomValidity(UI_MESSAGES[UI_LANG]['validate'].numberRequired);
  } else if (priceElement.validity.valueMissing) {
    priceElement.setCustomValidity(UI_MESSAGES[UI_LANG]['validate'].required);
  } else {
    priceElement.setCustomValidity('');
    isError = false;
  }
  priceElement.reportValidity();

  return !isError;
};

/**
 * @returns {boolean} true, if form fields values are valid
 */
const validateForm = () => {
  const validationResult = [];
  validationResult.push(validateTitleElement());
  validationResult.push(validatePriceElement());

  const isError = validationResult.some((value) => value === false);
  return !isError;
};

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
  roomsNumberElement.addEventListener('change', () => setAvailableCapacity());
  timeInElement.addEventListener('change', () => syncTimeOutField());
  timeOutElement.addEventListener('change', () => syncTimeInField());
};

formElement.addEventListener('submit', (evt) => {
  if (!validateForm()) {
    evt.preventDefault();
  }
});

formInitialize();
