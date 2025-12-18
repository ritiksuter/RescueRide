import { useEffect, useState } from "react";
import { getMechanicProfileApi, updateMechanicStatusApi } from "../api/mechanic.api";

export const useMechanicStatus = () => {
  const [status, setStatus] = useState("offline");

  useEffect(() => {
    getMechanicProfileApi().then((res) =>
      setStatus(res.data?.data?.status || "offline")
    );
  }, []);

  const updateStatus = async (newStatus) => {
    await updateMechanicStatusApi({ status: newStatus });
    setStatus(newStatus);
  };

  return { status, updateStatus };
};
