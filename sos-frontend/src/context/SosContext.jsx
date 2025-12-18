import React, { createContext, useContext, useEffect, useState } from "react";
import { createSosApi, getMySosListApi } from "../api/sos.api";
import { useSocketContext } from "./SocketContext";

const SosContext = createContext(null);

export const SosProvider = ({ children }) => {
  const { socket } = useSocketContext();
  const [sosList, setSosList] = useState([]);
  const [activeSos, setActiveSos] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await getMySosListApi();
      setSosList(res.data?.data || []);
    };
    load();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("sos:new", (sos) => {
      setSosList((prev) => [sos, ...prev]);
      setActiveSos(sos);
    });

    socket.on("sos:status-updated", (payload) => {
      setSosList((prev) =>
        prev.map((s) =>
          s.id === payload.id ? { ...s, ...payload } : s
        )
      );
    });

    return () => {
      socket.off("sos:new");
      socket.off("sos:status-updated");
    };
  }, [socket]);

  const createSos = async (payload) => {
    const res = await createSosApi(payload);
    setActiveSos(res.data?.data);
    return res;
  };

  return (
    <SosContext.Provider
      value={{ sosList, activeSos, createSos }}
    >
      {children}
    </SosContext.Provider>
  );
};

export const useSosContext = () => useContext(SosContext);
