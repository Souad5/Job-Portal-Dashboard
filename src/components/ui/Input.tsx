import { useFormContext } from "react-hook-form";
import { FaAsterisk } from "react-icons/fa";

interface InputProps {
  name: string;
  value?: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  name,
  label,
  value,
  type,
  placeholder,
  disabled,
  required,
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1 w-full">
      <label className="text-md flex gap-1 font-medium">
        {label} {required ? <FaAsterisk color="red" size={8} /> : ""}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full rounded-md bg-white dark:bg-slate-700 border dark:border-slate-700 border-gray-300 px-3 py-2 text-md
          focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-blue-200 ${disabled ? "cursor-not-allowed font-bold text-gray-400" : ""}`}
        disabled={disabled}
      />
      {errors[name] && (
        <p className="text-xs text-red-500">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
}
