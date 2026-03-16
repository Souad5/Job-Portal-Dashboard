import { Navigate } from "react-router";
import { useAuth } from "@/components/context/AuthContext";

type Props = {
  children: React.ReactNode;
  allowedRoles: string[];
};

const RoleProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default RoleProtectedRoute;
