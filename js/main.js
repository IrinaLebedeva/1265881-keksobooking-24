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

const checkRangeNumbers = (min, max) => {
  if (min < 0) {
    throw new ValidationError(ERRORS.minIsNotPositiveOrZeroNumber);
  }
  if (max < 0) {
    throw new ValidationError(ERRORS.maxIsNotPositiveOrZeroNumber);
  }
  if (max < min) {
    throw new ValidationError(ERRORS.maxSmallerThanMin);
  }
  if (max === min) {
    throw new ValidationError(ERRORS.maxIsEqualToMin);
  }
};

const checkFractionDigits = (fractionDigits) => {
  if (!((fractionDigits >= 0) && (fractionDigits <= 100))) {
    throw new ValidationError(ERRORS.fractionDigitsInvalidRange);
  }
};

const errorHandler = (err) => {
  //@todo тут будет какой-то обработчик
  err.message;
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

try {
  getRandomIntegerFromRange(3, 15);
} catch (err) {
  if (err instanceof ValidationError) {
    errorHandler(err);
  } else {
    throw err;
  }
}

try {
  getRandomFloatFromRange(4, 14, 7);
} catch (err) {
  if (err instanceof ValidationError) {
    errorHandler(err);
  } else {
    throw err;
  }
}
