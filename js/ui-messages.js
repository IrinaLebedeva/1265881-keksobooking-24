import {isEscapeKey} from './utils/is-escape-key.js';
import {getMessage, DEFAULT_MESSAGES} from './load-lang.js';

const ERROR_GET_DATA_CLASS_NAME = 'error--get-data';
const ERROR_SEND_DATA_CLASS_NAME = 'error--send-data';
const SUCCESS_SEND_DATA_CLASS_NAME = 'success--send-data';
const bodyElement = document.querySelector('body');
const errorFragment = document.querySelector('#error').content.querySelector('.error');
const successFragment = document.querySelector('#success').content.querySelector('.success');

const closeMessage = (evt, selector, onKeyDownHandler) => {
  if (evt.type === 'keydown' && !isEscapeKey(evt)) {
    return;
  }

  document.removeEventListener('keydown', onKeyDownHandler);
  const element = document.querySelector(selector);
  if (element) {
    element.remove();
  }
};

const closeGetDataErrorMessage = (evt) => closeMessage(evt, `.${ERROR_GET_DATA_CLASS_NAME}`, closeGetDataErrorMessage);

const closeSendDataErrorMessage = (evt) => closeMessage(evt, `.${ERROR_SEND_DATA_CLASS_NAME}`, closeSendDataErrorMessage);

const closeSendDataSuccessMessage = (evt) => closeMessage(evt, `.${SUCCESS_SEND_DATA_CLASS_NAME}`, closeSendDataSuccessMessage);

const showGetDataErrorMessage = () => {
  const errorNode = errorFragment.cloneNode(true);
  errorNode.querySelector('.error__message').textContent = getMessage(DEFAULT_MESSAGES.getDataError);
  errorNode.querySelector('.error__button').remove();
  errorNode.classList.add(ERROR_GET_DATA_CLASS_NAME);

  const errorElement = bodyElement.appendChild(errorNode);

  errorElement.addEventListener('click', closeGetDataErrorMessage);
  document.addEventListener('keydown', closeGetDataErrorMessage);
};

const showSendDataErrorMessage = () => {
  const errorNode = errorFragment.cloneNode(true);
  const errorButton = errorNode.querySelector('.error__button');

  errorNode.classList.add(ERROR_SEND_DATA_CLASS_NAME);

  const errorElement = bodyElement.appendChild(errorNode);

  errorButton.addEventListener('click', closeSendDataErrorMessage);
  errorElement.addEventListener('click', closeSendDataErrorMessage);
  document.addEventListener('keydown', closeSendDataErrorMessage);
};

const showSendDataSuccessMessage = () => {
  const successNode = successFragment.cloneNode(true);
  successNode.classList.add(SUCCESS_SEND_DATA_CLASS_NAME);

  const successElement = bodyElement.appendChild(successNode);

  successElement.addEventListener('click', closeSendDataSuccessMessage);
  document.addEventListener('keydown', closeSendDataSuccessMessage);
};

export {showGetDataErrorMessage, showSendDataErrorMessage, showSendDataSuccessMessage};
