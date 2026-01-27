import { createBrowserRouter } from "react-router";
import App from "../App";
import AdminPage from "@/pages/AdminPage";
import EmployerPage from "@/pages/EmployerPage";
import JobPostPage from "@/pages/JobPostPage";
import AllJobsPage from "@/pages/AllJobsPage";
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      },
      {
        path: "/employer",
        element: <EmployerPage />,
      },
      {
        path: "/job-post",
        element: <JobPostPage />,
      },
      {
        path: "/all-jobs",
        element: <AllJobsPage />,
      },
    ],
  },
]);

export default router;
