const AcceptedFileTypes = [
  'image/apng',
  'image/avif',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
  'image/bmp',
  'image/x-icon',
  'image/tiff',
];
const DEFAULT_AVATAR_URL = 'img/muffin-grey.svg';

const formElement = document.querySelector('form[name="advert-form"]');
const avatarElement = formElement.querySelector('input[name="avatar"]');
const avatarPreviewElement = formElement.querySelector('.ad-form-header__preview img');
const imagesElement = formElement.querySelector('input[name="images"]');
const imagesPreviewContainerElement = formElement.querySelector('.ad-form__photo');
const imagesPreviewFragment = document.querySelector('#images-preview').content.querySelector('img');

const setPreviewImageElement = (uploadImageElement, previewImageElement) => {
  const file = uploadImageElement.files[0];
  if (AcceptedFileTypes.includes(file.type)) {
    previewImageElement.src = URL.createObjectURL(file);
  }
};

const setAvatarElementChange = () => avatarElement.addEventListener('change', () => {
  setPreviewImageElement(avatarElement, avatarPreviewElement);
});

const setImagesElementChange = () => {
  imagesElement.addEventListener('change', () => {
    const imagesPreviewNode = imagesPreviewFragment.cloneNode(true);

    imagesPreviewContainerElement.textContent = '';
    imagesPreviewContainerElement.appendChild(imagesPreviewNode);

    const imagesPreviewElement = imagesPreviewContainerElement.querySelector('img');

    setPreviewImageElement(imagesElement, imagesPreviewElement);
  });
};

const clearPreviewImages = () => {
  avatarPreviewElement.src = DEFAULT_AVATAR_URL;
  imagesPreviewContainerElement.textContent = '';
};

export {setAvatarElementChange, setImagesElementChange, clearPreviewImages};
