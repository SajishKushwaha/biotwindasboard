import { Navigate, useLocation } from "react-router-dom";
import { getUser } from "@/lib/auth";
import { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = getUser();
  const loc = useLocation();
  if (!user) return <Navigate to={`/login?from=${encodeURIComponent(loc.pathname)}`} replace />;
  return <>{children}</>;
}
