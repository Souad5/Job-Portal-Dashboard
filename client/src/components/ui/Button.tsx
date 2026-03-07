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
      className={`relative px-6 py-2.5 rounded-lg font-medium inline-flex items-center justify-center cursor-pointer text-white transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed ${className} active:scale-95`}
    >
      {/* Background */}
      <span className="absolute inset-0 rounded-lg bg-linear-to-br from-green-600 to-green-500 filter blur-sm opacity-50"></span>
      <span className="absolute inset-0 rounded-lg bg-linear-to-br from-green-600 to-green-500 transition-all duration-200"></span>

      {/* Text */}
      <span className="relative">{value}</span>
    </button>
  );
};

export default Button;
