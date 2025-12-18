import { useMechanicStatus } from "../../hooks/useMechanicStatus";

export const MechanicProfilePage = () => {
  const { status } = useMechanicStatus();
  return <div>Status: {status}</div>;
};
