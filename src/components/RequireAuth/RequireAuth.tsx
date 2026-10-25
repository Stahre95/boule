import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();

  // kolla om användaren är inloggad
  if (loading) {
    return <p>Laddar...</p>;
  }

  // ingen är inloggad, skicka till login
  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  // användaren är inloggad, skicka till profilsidan
  return <>{children}</>;
}
