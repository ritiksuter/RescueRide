import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const mechanicIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export const MechanicMarker = ({ location, mechanic }) => {
  if (!location) return null;

  return (
    <Marker
      position={[location.lat, location.lng]}
      icon={mechanicIcon}
    >
      <Popup>
        <div className="text-sm">
          <div className="font-medium">
            {mechanic?.name || "Mechanic"}
          </div>
          <div className="text-xs text-gray-500">
            Live location
          </div>
        </div>
      </Popup>
    </Marker>
  );
};
