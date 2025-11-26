import { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardApp from "./components/DashboardApp";

type Route = "login" | "register" | "dashboard";

function AppContent() {
  const [currentRoute, setCurrentRoute] = useState<Route>("login");
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
          onRegisterSuccess={() => {}}
        />
      );
    case "login":
    default:
      return (
        <Login
          onNavigateToRegister={() => setCurrentRoute("register")}
          onLoginSuccess={() => {}}
        />
      );
  }
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
