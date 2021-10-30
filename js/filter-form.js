const formElement = document.querySelector('form[name="filter-form"]');
let advertCards = {};

const resetForm = () => {
  formElement.reset();
};

const filterFormInitialize = (cards) => {
  advertCards = cards;
  console.log(advertCards);
};

export {resetForm, filterFormInitialize};
