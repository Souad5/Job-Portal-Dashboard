import React from "react";

type ButtonProps = {
  value: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const SecondaryButton = ({
  value,
  onClick,
  className = "",
  type = "button",
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative px-6 py-2.5 rounded-lg font-medium inline-flex items-center justify-center cursor-pointer text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed ${className} active:scale-95`}
    >
      {/* Background */}
      <span className="absolute inset-0 rounded-lg bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 opacity-30 filter blur-sm"></span>

      {/* Text */}
      <span className="relative">{value}</span>
    </button>
  );
};

export default SecondaryButton;
