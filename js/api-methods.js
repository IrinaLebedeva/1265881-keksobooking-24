import {getMessage, DEFAULT_MESSAGES} from './load-lang.js';

class FetchError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

//можно куда-то логировать
const logError = (error) => error;

const getData = (url, onSuccess, onError) => fetch(url).
  then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new FetchError(`${response.url} ${response.status} (${response.statusText})`);
  }).
  then((data) => {
    onSuccess(data);
  }).
  catch((error) => {
    onError(getMessage(DEFAULT_MESSAGES.getDataError));
    logError(error);
  });

const sendData = (url, data, onSuccess, onError, onFinal) => {
  fetch(url,
    {
      method: 'POST',
      body: data,
    }).
    then(() => onSuccess()).
    catch((error) => onError(error)).
    finally(() => onFinal());
};

export {getData, sendData};
