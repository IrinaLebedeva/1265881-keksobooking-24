/*const LANG_CODE = 'ru';
const LANG_STRINGS = [
  {
    'minIsNotFinite': {
      'ru': 'Минимальное значение из диапазона не является конечным числом',
    },
  },
  {
    'maxIsNotFinite': {
      'ru': 'Максимальное значение из диапазона не является конечным числом',
    },
  },
  {
    'minIsNotPositiveOrZeroNumber': {
      'ru': 'Минимальное значение из диапазона не может быть меньше нуля',
    },
  },
  {
    'maxIsNotPositiveOrZeroNumber': {
      'ru': 'Максимальное значение из диапазона не может быть меньше нуля',
    },
  },
  {
    'maxSmallerThanMin': {
      'ru': 'Максимальное значение диапазона не может быть меньше минимального',
    },
  },
  {
    'maxIsEqualToMin': {
      'ru': 'Максимальное значение диапазона равно минимальному',
    },
  },
  {
    'fractionDigitsIsNotFinite': {
      'ru': 'Количество знаков после запятой не является конечным числом',
    },
  },
  {
    'fractionDigitsInvalidRange': {
      'ru': 'Количество знаков после запятой может быть в диапазоне от 0 до 100',
    },
  },
];*/
let errors = [];

function isPositiveOrZeroNumber(number) {
  return number >= 0;
}

function checkRangeNumbers(min, max) {
  if (!Number.isFinite(min)) {
    errors.push('minIsNotFinite');
  }
  if (!Number.isFinite(max)) {
    errors.push('maxIsNotFinite');
  }
  if (!isPositiveOrZeroNumber(min)) {
    errors.push('minIsNotPositiveOrZeroNumber');
  }
  if (!isPositiveOrZeroNumber(max)) {
    errors.push('maxIsNotPositiveOrZeroNumber');
  }
  if (max < min) {
    errors.push('maxSmallerThanMin');
  }
  if (max === min) {
    errors.push('maxIsEqualToMin');
  }
}

function checkFractionDigits(fractionDigits) {
  if (!Number.isFinite(fractionDigits)) {
    errors.push('fractionDigitsIsNotFinite');
  }
  if (!((fractionDigits >= 0) && (fractionDigits <= 100))) {
    errors.push('fractionDigitsInvalidRange');
  }
}

function showRangeNumberErrors() {
  /*errors.forEach((item) => {
    //@todo как же их достать?
  });*/
}

function getRandomIntegerFromRange(min, max) {
  errors = [];
  checkRangeNumbers(min, max);

  if (errors.length > 0) {
    showRangeNumberErrors();
    return false;
  }

  const randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
}
getRandomIntegerFromRange(3, 15);

function getRandomFloatFromRange(min, max, fractionDigits) {
  errors = [];
  checkFractionDigits(fractionDigits);
  checkRangeNumbers(min, max);

  if (errors.length > 0) {
    showRangeNumberErrors();
    return false;
  }

  const randomNumber = min + Math.random() * (max + 1 - min);
  return Number(randomNumber.toFixed(fractionDigits));
}
getRandomFloatFromRange(4, 14, 7);
