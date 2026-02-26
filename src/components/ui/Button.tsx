import React from "react";

type ButtonProps = {
  value: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

const Button = ({
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
      className={`relative px-6 py-2.5 rounded-lg font-medium inline-block cursor-pointer text-[#044635] dark:text-[#0af0b4] transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed ${className} active:scale-95`}
    >
      {/* Background layers */}
      <span className="absolute inset-0 rounded-lg bg-linear-to-br from-[#1e5849]/40 to-[#1e5849] filter blur-sm opacity-50"></span>
      <span className="absolute inset-0 rounded-lg bg-linear-to-br from-green-600 to-green-500 transition-all duration-200 group-hover:blur-sm"></span>
      <span className="relative text-white">{value}</span>
    </button>
  );
};

export default Button;
