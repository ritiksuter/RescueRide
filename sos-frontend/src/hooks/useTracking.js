import { useEffect, useState } from "react";
import { getTrackingInfoApi } from "../api/tracking.api";
import { useSocket } from "./useSocket";

export const useTracking = (sosId) => {
  const { socket } = useSocket();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getTrackingInfoApi(sosId).then((res) =>
      setLocation(res.data?.data?.lastLocation)
    );
  }, [sosId]);

  useEffect(() => {
    if (!socket) return;
    socket.on("tracking:location-updated", setLocation);
    return () => socket.off("tracking:location-updated");
  }, [socket]);

  return { location };
};
