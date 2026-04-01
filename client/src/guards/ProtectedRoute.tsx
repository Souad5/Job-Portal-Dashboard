import { useAuth } from "@/components/context/AuthContext";
import Loading from "@/components/ui/Loading";
import { Navigate } from "react-router";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { user, loading } = useAuth();

  if (loading) return <Loading></Loading>;

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
