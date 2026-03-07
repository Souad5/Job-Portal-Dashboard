import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900 text-white px-6">
      <div className="max-w-3xl text-center">
        {/* Image */}
        <img
          src="https://illustrations.popsy.co/gray/falling.svg"
          alt="404 illustration"
          className="w-72 mx-auto mb-8 drop-shadow-lg"
        />

        {/* 404 Text */}
        <h1 className="text-8xl font-extrabold bg-linear-to-r from-purple-400 to-red-500 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-semibold">Page Not Found</h2>

        <p className="mt-4 text-gray-400 text-lg">
          Oops! The page you`re looking for doesn`t exist or was moved.
        </p>

        {/* Button */}
        <div className="mt-8">
          <Link
            to="/"
            className="inline-block px-8 py-3 rounded-full bg-linear-to-r from-purple-500 to-red-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Go Back Home 🚀
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
