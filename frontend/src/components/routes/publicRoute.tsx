// Libraries
import type { JSX, ReactNode } from "react";
import { Navigate } from "react-router-dom";

// Store
import { useUserStore, type User } from "../../store/user.store";

interface PublicRouteProps {
  children: ReactNode;
};

export function PublicRoute({ children }: PublicRouteProps): JSX.Element {
  const user: User | null = useUserStore((state) => state.user);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  };

  return <>{children}</>;
};