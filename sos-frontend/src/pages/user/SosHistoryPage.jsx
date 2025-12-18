import { SosHistoryTable } from "../../components/sos/SosHistoryTable";
import { useSos } from "../../hooks/useSos";

export const SosHistoryPage = () => {
  const { sosList } = useSos();
  return <SosHistoryTable data={sosList} />;
};
