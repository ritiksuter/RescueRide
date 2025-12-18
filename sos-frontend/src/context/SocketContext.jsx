import React, { createContext, useContext, useEffect, useState } from "react";
import {
  connectNotificationSocket,
  disconnectNotificationSocket,
  getNotificationSocket,
} from "../api/notification.api";
import { useAuthContext } from "./AuthContext";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const s = connectNotificationSocket();
      setSocket(s);
      return () => disconnectNotificationSocket();
    } else {
      disconnectNotificationSocket();
      setSocket(null);
    }
  }, [isAuthenticated]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
