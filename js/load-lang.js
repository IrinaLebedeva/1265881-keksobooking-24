const loadLang = (lang) =>
  fetch(`./js/translations/${lang}.lang.json`).then((response) => {
    if (!response.ok) {
      throw new Error(`An error occurred while loading ${response.url}. Failed with status: ${response.status}, statusText: ${response.statusText}`);
    } else {
      return response.json();
    }
  });

export {loadLang};
