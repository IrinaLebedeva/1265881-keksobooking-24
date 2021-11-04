const advertFormElement = document.querySelector('.ad-form');
const mapFiltersFormElement = document.querySelector('.map__filters');
const inputAdvertFormElementsList = document.querySelectorAll('.ad-form fieldset');
const inputMapFiltersFormElementsList = document.querySelectorAll('.map__filters select, .map__filters fieldset');

const setAdvertFormInactive = () => {
  advertFormElement.classList.add('ad-form--disabled');
  inputAdvertFormElementsList.forEach((element) => element.disabled = true);
};

const setMapFiltersFormInactive = () => {
  mapFiltersFormElement.classList.add('map__filters--disabled');
  inputMapFiltersFormElementsList.forEach((element) => element.disabled = true);
};

const setPageInactive = () => {
  setAdvertFormInactive();
  setMapFiltersFormInactive();
};

const setAdvertFormActive = () => {
  advertFormElement.classList.remove('ad-form--disabled');
  inputAdvertFormElementsList.forEach((element) => element.disabled = false);
};

const setMapFiltersFormActive = () => {
  mapFiltersFormElement.classList.remove('map__filters--disabled');
  inputMapFiltersFormElementsList.forEach((element) => element.disabled = false);
};

const setPageActive = () => {
  setAdvertFormActive();
  setMapFiltersFormActive();
};

export {
  setPageInactive,
  setPageActive,
  setAdvertFormActive,
  setMapFiltersFormActive
};
