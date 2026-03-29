import { Navigate } from "react-router";
import { useAuth } from "@/components/context/AuthContext";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import Loading from "@/components/ui/Loading";

type Props = {
  children: React.ReactNode;
  allowedRoles: string[];
};

const RoleProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { user, loading } = useAuth();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (
      !loading &&
      user &&
      !allowedRoles.includes(user.role) &&
      !hasShownToast.current
    ) {
      toast.error("You do not have access to this route");
      hasShownToast.current = true; // prevent duplicate
    }
  }, [user, loading, allowedRoles]);

  if (loading) return <Loading />;

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default RoleProtectedRoute;
