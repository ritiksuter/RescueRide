import React from "react";
import { Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";

const userIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export const UserMarker = ({ location }) => {
  if (!location) return null;

  return (
    <>
      <Marker
        position={[location.lat, location.lng]}
        icon={userIcon}
      >
        <Popup>User SOS Location</Popup>
      </Marker>

      <Circle
        center={[location.lat, location.lng]}
        radius={40}
        pathOptions={{ color: "blue", fillOpacity: 0.15 }}
      />
    </>
  );
};
