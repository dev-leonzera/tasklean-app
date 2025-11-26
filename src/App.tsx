import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardApp from "./components/DashboardApp";

type Route = "login" | "register" | "dashboard";

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Se autenticado, sempre mostrar dashboard
  if (isAuthenticated) {
    return <DashboardApp />;
  }

  // Rotas públicas
  switch (currentRoute) {
    case "register":
      return (
        <Register
          onNavigateToLogin={() => setCurrentRoute("login")}
          onRegisterSuccess={() => setIsAuthenticated(true)}
        />
      );
    case "login":
    default:
      return (
        <Login
          onNavigateToRegister={() => setCurrentRoute("register")}
          onLoginSuccess={() => setIsAuthenticated(true)}
        />
      );
  }
}
