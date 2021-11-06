import {getMessage, DefaultMessages} from './load-lang.js';

const ERROR_GET_DATA_CLASS_NAME = 'error--get-data';
const ERROR_SEND_DATA_CLASS_NAME = 'error--send-data';
const SUCCESS_SEND_DATA_CLASS_NAME = 'success--send-data';
const bodyElement = document.querySelector('body');
const errorFragment = document.querySelector('#error').content.querySelector('.error');
const successFragment = document.querySelector('#success').content.querySelector('.success');

const closeMessage = (evt, selector, onKeyDownHandler) => {
  if (evt.type === 'keydown' && evt.key !== 'Escape') {
    return;
  }

  document.removeEventListener('keydown', onKeyDownHandler);
  const element = document.querySelector(selector);
  if (element) {
    element.remove();
  }
};

const getDataErrorHandler = (evt) => closeMessage(evt, `.${ERROR_GET_DATA_CLASS_NAME}`, getDataErrorHandler);

const sendDataErrorHandler = (evt) => closeMessage(evt, `.${ERROR_SEND_DATA_CLASS_NAME}`, sendDataErrorHandler);

const sendDataSuccessHandler = (evt) => closeMessage(evt, `.${SUCCESS_SEND_DATA_CLASS_NAME}`, sendDataSuccessHandler);

const showGetDataErrorMessage = () => {
  const errorNode = errorFragment.cloneNode(true);
  errorNode.querySelector('.error__message').textContent = getMessage(DefaultMessages.GET_DATA_ERROR);
  errorNode.querySelector('.error__button').remove();
  errorNode.classList.add(ERROR_GET_DATA_CLASS_NAME);

  const errorElement = bodyElement.appendChild(errorNode);

  errorElement.addEventListener('click', getDataErrorHandler);
  document.addEventListener('keydown', getDataErrorHandler);
};

const showSendDataErrorMessage = () => {
  const errorNode = errorFragment.cloneNode(true);
  const errorButton = errorNode.querySelector('.error__button');

  errorNode.classList.add(ERROR_SEND_DATA_CLASS_NAME);

  const errorElement = bodyElement.appendChild(errorNode);

  errorButton.addEventListener('click', sendDataErrorHandler);
  errorElement.addEventListener('click', sendDataErrorHandler);
  document.addEventListener('keydown', sendDataErrorHandler);
};

const showSendDataSuccessMessage = () => {
  const successNode = successFragment.cloneNode(true);
  successNode.classList.add(SUCCESS_SEND_DATA_CLASS_NAME);

  const successElement = bodyElement.appendChild(successNode);

  successElement.addEventListener('click', sendDataSuccessHandler);
  document.addEventListener('keydown', sendDataSuccessHandler);
};

export {
  showGetDataErrorMessage,
  showSendDataErrorMessage,
  showSendDataSuccessMessage
};
