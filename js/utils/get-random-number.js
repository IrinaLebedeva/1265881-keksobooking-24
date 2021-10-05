class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

const FRACTION_DIGITS_MIN = 0;
const FRACTION_DIGITS_MAX = 100;
const ERRORS = {
  minIsNotPositiveOrZeroNumber: new ValidationError('The minimum value from the range cannot be less than zero'),
  maxIsNotPositiveOrZeroNumber: new ValidationError('The maximum value from the range cannot be less than zero'),
  maxSmallerThanMin: new ValidationError('The maximum value of the range cannot be less than the minimum'),
  maxIsEqualToMin: new ValidationError('The maximum value of the range cannot be equal to the minimum'),
  fractionDigitsInvalidRange: new ValidationError(`The number of decimal places can be in the range from ${FRACTION_DIGITS_MIN} to ${FRACTION_DIGITS_MAX}`),
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
    throw error;
  }
};

/**
 * @param {number} fractionDigits
 * @return ValidationError
 */
const checkFractionDigits = (fractionDigits) => {
  if (fractionDigits < FRACTION_DIGITS_MIN || fractionDigits > FRACTION_DIGITS_MAX) {
    throw ERRORS.fractionDigitsInvalidRange;
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
