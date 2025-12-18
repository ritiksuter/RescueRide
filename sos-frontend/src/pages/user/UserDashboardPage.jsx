import { SosButton } from "../../components/sos/SosButton";
import { SosStatusCard } from "../../components/sos/SosStatusCard";
import { useSos } from "../../hooks/useSos";

export const UserDashboardPage = () => {
  const { activeSos } = useSos();

  return (
    <div className="space-y-4">
      <SosButton />
      <SosStatusCard sos={activeSos} />
    </div>
  );
};
