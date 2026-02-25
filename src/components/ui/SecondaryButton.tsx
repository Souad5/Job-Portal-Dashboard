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
      className="
        px-5 py-2.5 relative rounded group font-medium inline-block cursor-pointer
        border border-gray-200 dark:border-gray-700
      "
    >
      {/* glow blur */}
      <span
        className="
          absolute inset-0 rounded opacity-40 blur-sm
          bg-linear-to-br from-gray-200 to-gray-400
          dark:from-gray-700 dark:to-gray-900
        "
      />

      {/* pressed layer */}
      <span
        className="
          absolute inset-0 mt-0.5 ml-0.5 rounded opacity-40
          bg-linear-to-br from-gray-100 to-gray-200
          dark:from-gray-800 dark:to-gray-700
          group-active:opacity-0
        "
      />

      {/* hover shadow */}
      <span
        className="
          absolute inset-0 rounded shadow-xl transition duration-200
          bg-linear-to-br from-gray-100 to-gray-200
          dark:from-gray-800 dark:to-gray-700
          group-hover:blur-sm group-active:opacity-0
        "
      />

      {/* base */}
      <span
        className={`
          absolute inset-0 rounded transition duration-200
          bg-linear-to-br from-gray-100 to-gray-200
          dark:from-gray-800 dark:to-gray-700
          ${className}
        `}
      />

      {/* text */}
      <span
        className={`
          relative text-gray-900 dark:text-gray-100
          ${className}
        `}
      >
        {value}
      </span>
    </button>
  );
};

export default SecondaryButton;
