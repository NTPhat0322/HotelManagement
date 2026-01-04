import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./auth/PrivateRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  </AuthProvider>
);
