import { useEffect, useState } from "react";
import { AdminTable } from "../../components/admin/AdminTable";
import { getAllMechanicsApi } from "../../api/admin.api";

export const AdminMechanicsPage = () => {
  const [mechanics, setMechanics] = useState([]);

  useEffect(() => {
    getAllMechanicsApi().then((res) =>
      setMechanics(res.data?.data || [])
    );
  }, []);

  return (
    <AdminTable
      columns={[
        { key: "email", label: "Email" },
        { key: "status", label: "Status" },
      ]}
      data={mechanics}
    />
  );
};
