import {isEscapeKey} from './utils/is-escape-key.js';

const ERROR_GET_DATA_CLASS_NAME = 'error--get-data';
const ERROR_SEND_DATA_CLASS_NAME = 'error--send-data';
const SUCCESS_SEND_DATA_CLASS_NAME = 'success--send-data';
const bodyElement = document.querySelector('body');
const errorFragment = document.querySelector('#error').content;
const successFragment = document.querySelector('#success').content;

const closeGetDataErrorMessage = (evt) => {
  if (evt.type === 'keydown' && !isEscapeKey(evt)) {return;}

  const errorGetDataElement = document.querySelector(`.${ERROR_GET_DATA_CLASS_NAME}`);
  errorGetDataElement.removeEventListener('click', closeGetDataErrorMessage);
  document.removeEventListener('keydown', closeGetDataErrorMessage);
  errorGetDataElement.remove();
};

const closeSendDataErrorMessage = (evt) => {
  if (evt.type === 'keydown' && !isEscapeKey(evt)) {return;}

  const errorGetDataElement = document.querySelector(`.${ERROR_SEND_DATA_CLASS_NAME}`);
  errorGetDataElement.removeEventListener('click', closeSendDataErrorMessage);
  document.removeEventListener('keydown', closeSendDataErrorMessage);
  errorGetDataElement.remove();
};

const closeSendDataSuccessMessage = (evt) => {
  if (evt.type === 'keydown' && !isEscapeKey(evt)) {return;}

  const successGetDataElement = document.querySelector(`.${SUCCESS_SEND_DATA_CLASS_NAME}`);
  successGetDataElement.removeEventListener('click', closeSendDataSuccessMessage);
  document.removeEventListener('keydown', closeSendDataSuccessMessage);
  successGetDataElement.remove();
};

const showGetDataErrorMessage = (error) => {
  const errorNode = errorFragment.querySelector('.error').cloneNode(true);
  errorNode.querySelector('.error__message').textContent = error;
  errorNode.querySelector('.error__button').remove();
  errorNode.classList.add(ERROR_GET_DATA_CLASS_NAME);

  const errorElement = bodyElement.appendChild(errorNode);

  errorElement.addEventListener('click', closeGetDataErrorMessage);
  document.addEventListener('keydown', closeGetDataErrorMessage);
};

const showSendDataErrorMessage = (error) => {
  const errorNode = errorFragment.querySelector('.error').cloneNode(true);
  const errorButton = errorNode.querySelector('.error__button');

  errorNode.querySelector('.error__message').textContent = error;
  errorNode.classList.add(ERROR_SEND_DATA_CLASS_NAME);

  const errorElement = bodyElement.appendChild(errorNode);

  errorButton.addEventListener('click', closeSendDataErrorMessage);
  errorElement.addEventListener('click', closeSendDataErrorMessage);
  document.addEventListener('keydown', closeSendDataErrorMessage);
};

const showSendDataSuccessMessage = () => {
  const successNode = successFragment.querySelector('.success').cloneNode(true);
  successNode.classList.add(SUCCESS_SEND_DATA_CLASS_NAME);

  const successElement = bodyElement.appendChild(successNode);

  successElement.addEventListener('click', closeSendDataSuccessMessage);
  document.addEventListener('keydown', closeSendDataSuccessMessage);
};

export {showGetDataErrorMessage, showSendDataErrorMessage, showSendDataSuccessMessage};
