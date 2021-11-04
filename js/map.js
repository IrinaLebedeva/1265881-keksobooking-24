const ZOOM_LEVEL = 13;
const DEFAULT_MARKER_COORDINATES = [35.681729, 139.753927];
const MAX_COMMON_MARKERS_COUNT_ON_MAP = 10;
const MainIcon = {
  URL: './img/main-pin.svg',
  SIZE: [52, 52],
  ANCHOR: [26, 52],
};
const CommonIcon = {
  URL: './img/pin.svg',
  SIZE: [40, 40],
  ANCHOR: [20, 40],
};
let map = undefined;
let mainMarker = undefined;
const commonMarkers = [];

const setMapDefaultView = () => {
  map.setView(DEFAULT_MARKER_COORDINATES, ZOOM_LEVEL);
};

const removeMapMarkersList = () => {
  commonMarkers.forEach((marker) => marker.remove());
};

const mapInitialize = () => {
  map = L.map('map-canvas');
  setMapDefaultView();

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  return map;
};

const getIcon = (isMain = false) => {
  const currentIcon = isMain ? MainIcon : CommonIcon;
  return L.icon({
    iconUrl: currentIcon.URL,
    iconSize: currentIcon.SIZE,
    iconAnchor: currentIcon.ANCHOR,
  });
};

const addMarker = (coordinates, icon, isDraggable = false) => L.marker(coordinates, {icon: icon, draggable: isDraggable}).addTo(map);

const addCommonMarker = (coordinates) => addMarker(coordinates, getIcon());

const addMainMarker = () => addMarker(DEFAULT_MARKER_COORDINATES, getIcon(true), true);

const setCommonMarkers = (advertCards, callback) => {
  advertCards.forEach((card) => {
    const marker = addCommonMarker([card.location.lat, card.location.lng]);
    commonMarkers.push(marker);
    marker.bindPopup(() => callback(card));
  });
};

const setMainMarker = (callback) => {
  mainMarker = addMainMarker(map);
  callback(mainMarker.getLatLng());
  mainMarker.on('moveend', () => {
    callback(mainMarker.getLatLng());
  });
};

const resetMainMarker = (callback) => {
  mainMarker.setLatLng(DEFAULT_MARKER_COORDINATES);
  callback(mainMarker.getLatLng());
};

const mapClosePopup = () => map.closePopup();

export {
  mapInitialize,
  setMainMarker,
  setCommonMarkers,
  resetMainMarker,
  mapClosePopup,
  setMapDefaultView,
  removeMapMarkersList,
  MAX_COMMON_MARKERS_COUNT_ON_MAP
};
