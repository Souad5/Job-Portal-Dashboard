import Button from "@/components/ui/Button";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-blue-700 px-6">
      <div className="max-w-3xl text-center">
        {/* Image */}
        <img
          src="https://illustrations.popsy.co/gray/falling.svg"
          alt="404 illustration"
          className="w-72 mx-auto mb-8 drop-shadow-lg"
        />

        {/* 404 Text */}
        <h1 className="text-8xl font-extrabold ">404</h1>

        <h2 className="mt-4 text-3xl font-semibold">Page Not Found</h2>

        <p className="mt-4 text-gray-400 text-lg">
          Oops! The page you`re looking for doesn`t exist or was moved.
        </p>

        {/* Button */}
        <div className="mt-8">
          <Link to="/dashboard">
            <Button type="button" value="Go Back Home 🚀"></Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
