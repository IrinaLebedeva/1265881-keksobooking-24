class FetchError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

const getData = (url, onSuccess, onError) => {
  fetch(url).
    then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new FetchError(`${response.url} ${response.status} (${response.statusText})`);
    }).
    then(onSuccess).
    catch(onError);
};

const sendData = (url, data, onSuccess, onError, onFinal) => {
  fetch(url,
    {
      method: 'POST',
      body: data,
    }).
    then(onSuccess).
    catch(onError).
    finally(onFinal);
};

export {getData, sendData};
