const HIDDEN_CSS_CLASS_NAME = 'hidden';

const hideElement = (element) => element.classList.add(HIDDEN_CSS_CLASS_NAME);

const showElement = (element) => element.classList.remove(HIDDEN_CSS_CLASS_NAME);

export {hideElement, showElement};
