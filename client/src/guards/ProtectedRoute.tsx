import { Navigate } from "react-router";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const recruiter = localStorage.getItem("recruiter");

  if (!recruiter) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
