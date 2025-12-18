import { Button } from "../common/Button";
import { useSos } from "../../hooks/useSos";

export const SosButton = () => {
  const { createSos, activeSos } = useSos();

  const handleClick = async () => {
    if (activeSos) return alert("SOS already active");

    navigator.geolocation.getCurrentPosition((pos) => {
      createSos({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  return (
    <Button
      variant="danger"
      onClick={handleClick}
      className="w-full py-4 text-lg"
    >
      🚨 Raise SOS
    </Button>
  );
};
