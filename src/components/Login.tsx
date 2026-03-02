import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import Input from "../components/ui/Input";
import PasswordInput from "../components/ui/PasswordInput";
import Button from "../components/ui/Button";
import toast from "react-hot-toast";

type LoginFormInputs = {
  email: string;
  password: string;
  remember: boolean;
};

const Login = () => {
  const navigate = useNavigate();

  const methods = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });
  const notify = () => toast.success("Login successful!");

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log("Login data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    notify();
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-50 dark:bg-slate-900 transition-colors duration-500">
      {/* Left Image */}
      <div className="hidden md:flex w-1/2">
        <img
          src="/1.jpg"
          alt="Login illustration"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-4 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl px-6 sm:px-10 py-10 w-full max-w-md"
        >
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-50 text-center">
            Sign In
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-300 text-center mt-1">
            Welcome back! Please login to your account.
          </p>

          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 flex flex-col gap-5"
            >
              <Input
                name="email"
                label="Email"
                placeholder="Email address"
                type="email"
              />

              <PasswordInput
                name="password"
                label="Password"
                placeholder="Enter your password"
              />

              <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-300">
                <label className="flex items-center gap-2 cursor-pointer mt-2 sm:mt-0">
                  <input
                    type="checkbox"
                    {...methods.register("remember")}
                    className="accent-indigo-500 w-4 h-4"
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  className="hover:underline mt-2 sm:mt-0 text-indigo-600 dark:text-indigo-400"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                value={isSubmitting ? "Signing in..." : "Login"}
                type="submit"
              />
            </form>
          </FormProvider>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
