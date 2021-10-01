class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

function isPositiveOrZeroNumber(number) {
  return number >= 0;
}

function checkRangeNumbers(min, max) {
  if (!Number.isFinite(min)) {
    throw new ValidationError('minIsNotFinite');
  }
  if (!Number.isFinite(max)) {
    throw new ValidationError('maxIsNotFinite');
  }
  if (!isPositiveOrZeroNumber(min)) {
    throw new ValidationError('minIsNotPositiveOrZeroNumber');
  }
  if (!isPositiveOrZeroNumber(max)) {
    throw new ValidationError('maxIsNotPositiveOrZeroNumber');
  }
  if (max < min) {
    throw new ValidationError('maxSmallerThanMin');
  }
  if (max === min) {
    throw new ValidationError('maxIsEqualToMin');
  }
}

function checkFractionDigits(fractionDigits) {
  if (!Number.isFinite(fractionDigits)) {
    throw new ValidationError('fractionDigitsIsNotFinite');
  }
  if (!((fractionDigits >= 0) && (fractionDigits <= 100))) {
    throw new ValidationError('fractionDigitsInvalidRange');
  }
}

function errorHandler(err) {
  //@todo тут будет какой-то обработчик
  err.message;
}

function getRandomIntegerFromRange(min, max) {
  try {
    checkRangeNumbers(min, max);
  } catch (err) {
    if (err instanceof ValidationError) {
      errorHandler(err);
      return false;
    } else {
      throw err;
    }
  }

  const randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
}
getRandomIntegerFromRange(3, 15);

function getRandomFloatFromRange(min, max, fractionDigits) {
  try {
    checkFractionDigits(fractionDigits);
    checkRangeNumbers(min, max);
  } catch (err) {
    if (err instanceof ValidationError) {
      errorHandler(err);
      return false;
    } else {
      throw err;
    }
  }

  const randomNumber = min + Math.random() * (max + 1 - min);
  return Number(randomNumber.toFixed(fractionDigits));
}
getRandomFloatFromRange(4, 14, 7);
