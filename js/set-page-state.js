const advertFormElement = document.querySelector('.ad-form');
const advertFormElementsList = advertFormElement.querySelectorAll('input, select, textarea, button');
const mapFiltersFormElement = document.querySelector('.map__filters');
const mapFiltersFormElementsList = mapFiltersFormElement.querySelectorAll('input, select, textarea, button');

const setPageInactive = () => {
  advertFormElement.classList.add('ad-form--disabled');
  advertFormElementsList.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });

  mapFiltersFormElement.classList.add('map__filters--disabled');
  mapFiltersFormElementsList.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

const setPageActive = () => {
  advertFormElement.classList.remove('ad-form--disabled');
  advertFormElementsList.forEach((element) => {
    element.removeAttribute('disabled');
  });

  mapFiltersFormElement.classList.remove('map__filters--disabled');
  mapFiltersFormElementsList.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

export {setPageInactive, setPageActive};
