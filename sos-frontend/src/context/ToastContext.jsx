import React, { createContext, useContext, useState } from "react";
import { Toast } from "../components/common/Toast";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const push = (message, type = "info") => {
    setToasts((prev) => [...prev, { id: Date.now(), message, type }]);
  };

  const remove = (id) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <Toast key={t.id} {...t} onClose={() => remove(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToastContext = () => useContext(ToastContext);
