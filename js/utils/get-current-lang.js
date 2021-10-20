const DEFAULT_LANG = 'ru';

const getCurrentLang = () => {
  const currentLang = document.querySelector('html').lang;
  return (currentLang === '') ? DEFAULT_LANG : currentLang;
};

export {getCurrentLang};
