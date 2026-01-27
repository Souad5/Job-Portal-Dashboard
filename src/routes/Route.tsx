import { createBrowserRouter } from "react-router";
import App from "../App";
import DashBoard from "@/dashboard/DashBoard";
import AdminPage from "@/pages/AdminPage";
import EmployerPage from "@/pages/EmployerPage";
import JobPostPage from "@/pages/JobPostPage";
import AllJobsPage from "@/pages/AllJobsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <DashBoard />,
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
