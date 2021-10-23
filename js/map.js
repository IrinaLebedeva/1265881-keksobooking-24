const ZOOM_LEVEL = 8;
const DEFAULT_MARKER_COORDINATES = [35.681729, 139.753927];
const MAIN_ICON = {
  url: './img/main-pin.svg',
  size: [32, 32],
  anchor: [16, 32],
};
const COMMON_ICON = {
  url: './img/pin.svg',
  size: [32, 32],
  anchor: [16, 32],
};

const mapInitialize = () => {
  const map = L.map('map-canvas').setView(DEFAULT_MARKER_COORDINATES, ZOOM_LEVEL);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  return map;
};

const getIcon = (isMain = false) => {
  const currentIcon = isMain ? MAIN_ICON : COMMON_ICON;
  return L.icon({
    iconUrl: currentIcon.url,
    iconSize: currentIcon.size,
    iconAnchor: currentIcon.anchor,
  });
};

const addMarker = (map, coordinates, icon, isDraggable = false) => L.marker(coordinates, {icon: icon, draggable: isDraggable}).addTo(map);

const addCommonMarker = (map, coordinates) => addMarker(map, coordinates, getIcon());

const addMainMarker = (map) => addMarker(map, DEFAULT_MARKER_COORDINATES, getIcon(true), true);

export {mapInitialize, addMainMarker, addCommonMarker};
