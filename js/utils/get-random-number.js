class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

const ERRORS = {
  minIsNotPositiveOrZeroNumber: 'Минимальное значение из диапазона не может быть меньше нуля',
  maxIsNotPositiveOrZeroNumber: 'Максимальное значение из диапазона не может быть меньше нуля',
  maxSmallerThanMin: 'Максимальное значение диапазона не может быть меньше минимального',
  maxIsEqualToMin: 'Максимальное значение диапазона равно минимальному',
  fractionDigitsInvalidRange: 'Количество знаков после запятой может быть в диапазоне от 0 до 100',
};

/**
 * @param {number} min
 * @param {number} max
 * @throws ValidationError
 */
const checkRangeNumbers = (min, max) => {
  const error =
    (min < 0 ? ERRORS.minIsNotPositiveOrZeroNumber : null) ||
    (max < 0 ? ERRORS.maxIsNotPositiveOrZeroNumber : null) ||
    (max < min ? ERRORS.maxSmallerThanMin : null) ||
    (max === min ? ERRORS.maxIsEqualToMin : null);
  if (error) {
    throw new ValidationError(error);
  }
};

/**
 * @param {number} fractionDigits
 * @return ValidationError
 */
const checkFractionDigits = (fractionDigits) => {
  if (!((fractionDigits >= 0) && (fractionDigits <= 100))) {
    throw new ValidationError(ERRORS.fractionDigitsInvalidRange);
  }
};

/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 * @throws ValidationError
 */
const getRandomIntegerFromRange = (min, max) => {
  checkRangeNumbers(min, max);

  const randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

/**
 * @param {number} min
 * @param {number} max
 * @param {number} fractionDigits
 * @returns {number}
 * @throws ValidationError
 */
const getRandomFloatFromRange = (min, max, fractionDigits) => {
  checkFractionDigits(fractionDigits);
  checkRangeNumbers(min, max);

  const randomNumber = min + Math.random() * (max + 1 - min);
  return Number(randomNumber.toFixed(fractionDigits));
};

export {getRandomIntegerFromRange, getRandomFloatFromRange, ValidationError};
