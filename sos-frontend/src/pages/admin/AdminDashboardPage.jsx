import { AdminStatsCards } from "../../components/admin/AdminStatsCards";
import { getAdminStatsApi } from "../../api/admin.api";
import { useEffect, useState } from "react";

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    getAdminStatsApi().then((res) =>
      setStats(res.data?.data || [])
    );
  }, []);

  return <AdminStatsCards stats={stats} />;
};
