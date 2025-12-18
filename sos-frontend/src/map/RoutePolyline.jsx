import React from "react";
import { Polyline } from "react-leaflet";

export const RoutePolyline = ({ path = [] }) => {
  if (!path.length) return null;

  const positions = path.map((p) => [p.lat, p.lng]);

  return (
    <Polyline
      positions={positions}
      pathOptions={{ color: "red", weight: 4 }}
    />
  );
};
