import { LiveTrackingMap } from "../../components/tracking/LiveTrackingMap";
import { TrackingInfoPanel } from "../../components/tracking/TrackingInfoPanel";
import { useTracking } from "../../hooks/useTracking";
import { useParams } from "react-router-dom";

export const UserTrackingPage = () => {
  const { sosId } = useParams();
  const { sos, mechanic, userLocation, mechanicLocation, path } =
    useTracking(sosId);

  return (
    <div className="space-y-4">
      <TrackingInfoPanel sos={sos} mechanic={mechanic} />
      <LiveTrackingMap
        userLocation={userLocation}
        mechanicLocation={mechanicLocation}
        path={path}
        mechanic={mechanic}
      />
    </div>
  );
};
