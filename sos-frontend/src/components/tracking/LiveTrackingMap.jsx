import { MapContainer } from "../../map/MapContainer";
import { UserMarker } from "../../map/UserMarker";
import { MechanicMarker } from "../../map/MechanicMarker";
import { RoutePolyline } from "../../map/RoutePolyline";

export const LiveTrackingMap = ({
  userLocation,
  mechanicLocation,
  path,
  mechanic,
}) => {
  return (
    <MapContainer center={userLocation}>
      <UserMarker location={userLocation} />
      <MechanicMarker
        location={mechanicLocation}
        mechanic={mechanic}
      />
      <RoutePolyline path={path} />
    </MapContainer>
  );
};
