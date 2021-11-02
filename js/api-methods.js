class FetchError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

const getDataCache = {};

const getData = (url, cacheKey, onSuccess, onError, onFinal) => {
  if (getDataCache[cacheKey]) {
    onSuccess(getDataCache[cacheKey]);
    return;
  }
  fetch(url).
    then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new FetchError(`${response.url} ${response.status} (${response.statusText})`);
    }).
    then((data) => {
      getDataCache[cacheKey] = data;
      onSuccess(getDataCache[cacheKey]);
    }).
    catch(onError).
    finally(onFinal);
};

const sendData = (url, data, onSuccess, onError, onFinal) => {
  fetch(url,
    {
      method: 'POST',
      body: data,
    }).
    then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new FetchError(`${response.url} ${response.status} (${response.statusText})`);
      }
    }).
    catch(onError).
    finally(onFinal);
};

export {getData, sendData};
