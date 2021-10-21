const DEFAULT_MESSAGES = {
  tooShortLength: 'Add another $0 char.',
  tooLongLength: 'Remove $0 char.',
  required: 'This field is required',
  tooBigPriceValue: 'Please 🙏 , cut the price by at least $0! The maximum allowed field value is $1',
  tooSmallPriceValue: 'The minimum allowed price for the selected type of accommodation 🏠 is $0',
  numberRequired: 'Please 🙏 , correct the entered value. Only numbers are allowed',
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

const getMessage = (key) => messages[key] || DEFAULT_MESSAGES[key] || `${key}`;

export {loadLang, getMessage};
