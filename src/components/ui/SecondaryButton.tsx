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
  className,
  type = "button",
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="px-5 py-2.5 relative rounded group font-medium inline-block cursor-pointer border border-gray-200"
    >
      {/* glow blur */}
      <span className="absolute inset-0 rounded opacity-40 blur-sm bg-linear-to-br from-gray-200 to-gray-400"></span>

      {/* pressed layer */}
      <span className="absolute inset-0 mt-0.5 ml-0.5 rounded opacity-40 bg-linear-to-br from-gray-100 to-gray-200 group-active:opacity-0"></span>

      {/* hover shadow */}
      <span className="absolute inset-0 rounded shadow-xl transition duration-200 bg-linear-to-br from-gray-100 to-gray-200 group-hover:blur-sm group-active:opacity-0"></span>

      {/* base */}
      <span
        className={`absolute inset-0 rounded transition duration-200 bg-linear-to-br from-gray-100 to-gray-200 ${className}`}
      ></span>

      {/* text */}
      <span className={`relative  ${className}`}>{value}</span>
    </button>
  );
};

export default SecondaryButton;
