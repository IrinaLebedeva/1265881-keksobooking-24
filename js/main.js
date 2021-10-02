import {getRandomIntegerFromRange, getRandomFloatFromRange, ValidationError} from './utils/get-random-number.js';

const errorHandler = (err) => {
  //@todo тут будет какой-то обработчик
  err.message;
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
