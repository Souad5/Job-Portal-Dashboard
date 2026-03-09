import { createBrowserRouter } from "react-router";
import JobPostPage from "../pages/JobPostPage";
import AllJobsPage from "../pages/AllJobsPage";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import Login from "../components/Login";
import RecruiterPage from "../pages/RecruiterPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: (
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <HomePage />,
      },
      {
        path: "/recruiter-page",
        element: <RecruiterPage />,
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
