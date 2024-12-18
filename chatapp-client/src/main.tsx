import { AuthProvider } from "@/auth/authcontext";
import { SocketProvider } from "@/context/socketcontext";
import { Router } from "@/router/router";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import 'sweetalert2/src/sweetalert2.scss';
import { ChatProvider } from "@/context/chatcontext";
import "./index.css";


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ChatProvider>
      <AuthProvider>
        <SocketProvider>
          <Router />
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>
  </BrowserRouter>
);
