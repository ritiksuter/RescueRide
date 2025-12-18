import { useEffect, useState } from "react";
import { getAdminSosApi } from "../../api/admin.api";
import { AdminTable } from "../../components/admin/AdminTable";

export const AdminSosMonitorPage = () => {
  const [sos, setSos] = useState([]);

  useEffect(() => {
    getAdminSosApi().then((res) =>
      setSos(res.data?.data || [])
    );
  }, []);

  return (
    <AdminTable
      columns={[
        { key: "id", label: "SOS ID" },
        { key: "status", label: "Status" },
      ]}
      data={sos}
    />
  );
};
