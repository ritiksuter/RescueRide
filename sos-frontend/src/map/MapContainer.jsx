import React from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";

export const MapContainer = ({
  center,
  zoom = 14,
  className = "h-80 w-full rounded-lg",
  children,
}) => {
  if (!center) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gray-100 text-sm text-gray-500`}
      >
        Waiting for location...
      </div>
    );
  }

  return (
    <LeafletMap
      center={[center.lat, center.lng]}
      zoom={zoom}
      scrollWheelZoom
      className={className}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </LeafletMap>
  );
};
