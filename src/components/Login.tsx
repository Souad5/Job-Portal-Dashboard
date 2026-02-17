import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

type LoginFormInputs = {
  email: string;
  password: string;
  remember: boolean;
};

const Login: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log("Login data:", data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redirect after successful login
    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Left Image */}
      <div className="w-1/2 hidden md:block">
        <img
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="Login illustration"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white shadow-lg rounded-2xl px-8 py-10 w-80 md:w-96"
        >
          <h1 className="text-3xl font-semibold text-gray-900 text-center">
            Sign in
          </h1>
          <p className="text-sm text-gray-500 text-center mt-2">
            Welcome back! Please sign in to continue
          </p>

          {/* Email */}
          <div className="mt-8">
            <input
              type="email"
              placeholder="Email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email address",
                },
              })}
              className={`w-full h-11 px-5 rounded-full border text-sm outline-none transition
                ${
                  errors.email
                    ? "border-red-400"
                    : "border-gray-300 focus:border-indigo-500"
                }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mt-5">
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              className={`w-full h-11 px-5 rounded-full border text-sm outline-none transition
                ${
                  errors.password
                    ? "border-red-400"
                    : "border-gray-300 focus:border-indigo-500"
                }`}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("remember")}
                className="accent-indigo-500"
              />
              Remember me
            </label>
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            disabled={isSubmitting}
            className="mt-8 w-full h-11 rounded-full bg-indigo-500 text-white font-medium
                       hover:bg-indigo-600 transition disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default Login;
