// Libraries
import type { JSX, ReactNode } from "react";
import { Navigate } from "react-router-dom";

// Store
import { useUserStore, type User } from "../../store/user.store.ts";

interface ProtectedRouteProps {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const user: User | null = useUserStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  };

  return <>{children}</>;
};