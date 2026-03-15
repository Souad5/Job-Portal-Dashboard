import { Navigate } from "react-router";

type Props = {
  children: React.ReactNode;
  allowedRoles: string[];
};

const RoleProtectedRoute = ({ children, allowedRoles }: Props) => {
  const storedUser = localStorage.getItem("token");

  if (!storedUser) {
    return <Navigate to="/login" />;
  }

  const user = JSON.parse(storedUser);

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default RoleProtectedRoute;
