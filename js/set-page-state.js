const advertFormElement = document.querySelector('.ad-form');
const mapFiltersFormElement = document.querySelector('.map__filters');
const inputElementsList = document.querySelectorAll('.ad-form fieldset, .map__filters select, .map__filters fieldset');

const setPageInactive = () => {
  advertFormElement.classList.add('ad-form--disabled');
  mapFiltersFormElement.classList.add('map__filters--disabled');
  inputElementsList.forEach((element) => element.disabled = true);
};

const setPageActive = () => {
  advertFormElement.classList.remove('ad-form--disabled');
  mapFiltersFormElement.classList.remove('map__filters--disabled');
  inputElementsList.forEach((element) => element.disabled = false);
};

export {setPageInactive, setPageActive};
