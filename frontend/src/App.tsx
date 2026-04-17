// Libraries
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import { LoginPage } from "./pages/login/login.tsx";
import { RegisterPage } from "./pages/register/register.tsx";
import { Dashboard } from "./pages/dashboard/dashboard.tsx";

// Routes
import { ProtectedRoute } from "./components/routes/protectedRoute.tsx";
import {PublicRoute } from "./components/routes/publicRoute.tsx"

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}