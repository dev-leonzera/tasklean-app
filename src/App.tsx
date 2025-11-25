import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardApp from "./components/DashboardApp";

type Route = "landing" | "login" | "register" | "dashboard";

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>("landing");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Se autenticado, sempre mostrar dashboard
  if (isAuthenticated) {
    return <DashboardApp />;
  }

  // Rotas públicas
  switch (currentRoute) {
    case "login":
      return (
        <Login
          onNavigateToRegister={() => setCurrentRoute("register")}
          onNavigateToLanding={() => setCurrentRoute("landing")}
          onLoginSuccess={() => setIsAuthenticated(true)}
        />
      );
    case "register":
      return (
        <Register
          onNavigateToLogin={() => setCurrentRoute("login")}
          onNavigateToLanding={() => setCurrentRoute("landing")}
          onRegisterSuccess={() => setIsAuthenticated(true)}
        />
      );
    case "landing":
    default:
      return (
        <LandingPage
          onNavigateToLogin={() => setCurrentRoute("login")}
          onNavigateToRegister={() => setCurrentRoute("register")}
        />
      );
  }
}
