import { createBrowserRouter } from "react-router";
import App from "../App";
import EmployerPage from "../pages/EmployerPage";
import JobPostPage from "../pages/JobPostPage";
import AllJobsPage from "../pages/AllJobsPage";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";

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
        path: "/dashboard",
        element: <HomePage />,
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
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
