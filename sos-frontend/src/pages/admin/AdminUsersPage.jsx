import { useEffect, useState } from "react";
import { AdminTable } from "../../components/admin/AdminTable";
import { getAllUsersApi } from "../../api/admin.api";

export const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsersApi().then((res) =>
      setUsers(res.data?.data || [])
    );
  }, []);

  return (
    <AdminTable
      columns={[
        { key: "email", label: "Email" },
        { key: "role", label: "Role" },
      ]}
      data={users}
    />
  );
};
