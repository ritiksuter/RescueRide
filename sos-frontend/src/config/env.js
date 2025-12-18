export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const MAP_CONFIG = {
  lat: Number(import.meta.env.VITE_MAP_DEFAULT_LAT),
  lng: Number(import.meta.env.VITE_MAP_DEFAULT_LNG),
  zoom: Number(import.meta.env.VITE_MAP_DEFAULT_ZOOM),
};

export const APP_NAME = import.meta.env.VITE_APP_NAME;
