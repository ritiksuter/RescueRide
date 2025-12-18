import { useParams } from "react-router-dom";
import { LiveTrackingMap } from "../../components/tracking/LiveTrackingMap";
import { useTracking } from "../../hooks/useTracking";

export const MechanicTrackingPage = () => {
  const { sosId } = useParams();
  const { userLocation, mechanicLocation, path, sendCurrentLocation } =
    useTracking(sosId, { role: "mechanic" });

  return (
    <div className="space-y-4">
      <button onClick={sendCurrentLocation}>Send Location</button>
      <LiveTrackingMap
        userLocation={userLocation}
        mechanicLocation={mechanicLocation}
        path={path}
      />
    </div>
  );
};
