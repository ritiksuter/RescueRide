import AppRouter from "./router";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import { SosProvider } from "./context/SosContext";
import { ToastProvider } from "./context/ToastContext";

const App = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <SocketProvider>
          <SosProvider>
            <AppRouter />
          </SosProvider>
        </SocketProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
