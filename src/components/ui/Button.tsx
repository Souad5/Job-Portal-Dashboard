import React from "react";

type buttonProps = {
  value: string;
  type: unknown;
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
};

const Button = ({ value, onClick }: buttonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2.5 relative rounded group font-medium text-white inline-block cursor-pointer"
    >
      <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-linear-to-br from-purple-600 to-blue-500"></span>
      <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-linear-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
      <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-linear-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-linear-to-br to-purple-600 from-blue-500"></span>
      <span className="relative">{value}</span>
    </button>
  );
};

export default Button;
