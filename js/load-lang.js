const DefaultMessages = {
  TOO_SHORT_LENGTH: 'Add another $0 char.',
  TOO_LONG_LENGTH: 'Remove $0 char.',
  REQUIRED: 'This field is required',
  TOO_BIG_PRICE_VALUE: 'Please 🙏 , cut the price by at least $0! The maximum allowed field value is $1',
  TOO_SMALL_PRICE_VALUE: 'The minimum allowed price for the selected type of accommodation 🏠 is $0',
  NUMBER_REQUIRED: 'Please 🙏 , correct the entered value. Only numbers are allowed',
  GET_DATA_ERROR: 'An error occurred while downloading data from the server, but posting ads is working properly. You can add your ad while we restore the data loading service.',
};

let messages = {};

const loadLang = (lang) =>
  fetch(`./js/translations/${lang}.lang.json`).then((response) => {
    if (!response.ok) {
      throw new Error(`An error occurred while loading ${response.url}. Failed with status: ${response.status}, statusText: ${response.statusText}`);
    } else {
      return response.json();
    }
  }).then((json) => {
    messages = json;
  });

const getMessage = (key) => messages[key] || key;

export {loadLang, getMessage, DefaultMessages};
